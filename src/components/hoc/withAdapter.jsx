import React, {useEffect, useState} from 'react';
import WebexDataProvider from '../WebexDataProvider/WebexDataProvider';

/**
 * Adapter interface
 *
 * @external WebexAdapter
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/WebexAdapter.js#L12}
 */

/**
 * Function that returns an instance of an adapter based on props.
 *
 * @callback AdapterFactory
 * @param {object} props
 * @returns {external:WebexAdapter}
 */

/**
 * Function the returns the display name of a component
 *
 * @param {React.Component|Function} Component The component to get the display name from
 * @returns {string} The display name of the component
 */
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * withAdapter is a high-order component that takes a component (WrappedComponent)
 * and a function that takes props as an input and returns an instantiated instance
 * of an adapter, that takes care of connecting/disconnecting this adapter instance
 * and providing it on a React context.
 *
 * @example
 *
 * function OriginalComponent {
 *   return <div> </div>;
 * }
 *
 * const adapterFactory: props => {
 *   const webex = new Webex({
 *     credentials: props.accessToken,
 *   });
 *   return new WebexSDKAdapter(webex);
 * }
 *
 * const EnhancedComponent = withAdapter(OriginalComponent, adapterFactory);
 *
 * <EnhancedComponent {props}/>
 *
 * @param {React.Component} WrappedComponent The inner component to wrap and enhance
 * @param {AdapterFactory} adapterFactory Function that returns an instance of an adapter
 * @returns {React.Component} The enhanced component
 */
export default function withAdapter(WrappedComponent, adapterFactory) {
  /**
   * @param {object} props Data to be forwarded to WrappedComponent
   * @returns {object} JSX of the component
   */
  function WithAdapter(props) {
    const [adapterConnected, setAdapterConnected] = useState(false);
    const [adapter, setAdapter] = useState(null);

    useEffect(() => {
      setAdapter(adapterFactory(props));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adapterFactory]);

    useEffect(() => {
      let cleanup;

      /**
       * Helper function to connect adapter asynchronously in hook.
       *
       * @returns {Promise} A promise that resolves when the adapter finishes connecting
       */
      async function connect() {
        await adapter.connect();
        global.testRendererAct(() => setAdapterConnected(true));
      }

      /**
       * Helper function to disconnect adapter asynchronously after tearing down hook.
       *
       * @returns {Promise} A promise that resolves when the adapter finishes disconnecting
       */
      async function disconnect() {
        setAdapterConnected(false);
        await adapter.disconnect();
      }

      if (adapter) {
        connect();
        cleanup = () => disconnect();
      }

      return cleanup;
    }, [adapter]);

    const wrappedProps = {...props, adapterConnected};
    const newComponent = <WrappedComponent {...wrappedProps} />;

    return adapterConnected ? (
      <WebexDataProvider adapter={adapter}>
        {newComponent}
      </WebexDataProvider>
    ) : newComponent;
  }

  WithAdapter.displayName = `WithAdapter(${getDisplayName(WrappedComponent)})`;

  return WithAdapter;
}
