import React, {useContext} from 'react';
import {create, act} from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import PropTypes from 'prop-types';

import withAdapter from './withAdapter';
import WebexJSONAdapter from '../../adapters/WebexJSONAdapter';
import {AdapterContext} from '../hooks';

describe('withAdapter Higher Order Component', () => {
  const adapterConnectedChanged = jest.fn();
  const contextAdapterChanged = jest.fn();
  const customPropsChanged = jest.fn();
  let adapter;
  let testRenderer;

  /**
   * Sample component used for testing.
   *
   * @param {object} root0 The props array
   * @param {boolean} root0.adapterConnected Prop indicating whether the adapter is connected
   * @param {string} root0.prop1 Prop used for testing
   * @param {string} root0.prop2 Prop used for testing
   * @returns {object} JSX of the component
   */
  function MyComponent({adapterConnected, prop1, prop2}) {
    adapterConnectedChanged(adapterConnected);
    contextAdapterChanged(useContext(AdapterContext));
    customPropsChanged({prop1, prop2});

    return <div />;
  }

  MyComponent.propTypes = {
    adapterConnected: PropTypes.bool.isRequired,
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.string.isRequired,
  };

  const MyComponentWithAdapter = withAdapter(MyComponent, () => {
    adapter = new WebexJSONAdapter({});
    adapter.connect = jest.fn(adapter.connect);
    adapter.disconnect = jest.fn(adapter.disconnect);

    return adapter;
  });

  act(() => {
    global.testRendererAct = act;
    testRenderer = create(
      <MyComponentWithAdapter prop1="value1" prop2="value2" />,
    );
  });

  test('forwards all props', () => {
    expect(customPropsChanged).toHaveBeenCalledWith({prop1: 'value1', prop2: 'value2'});
  });

  test('instantiates an adapter', async () => {
    await waitForExpect(() => expect(adapter).toBeInstanceOf(WebexJSONAdapter));
  });

  test('calls the adapter connect function', async () => {
    await waitForExpect(() => expect(adapter.connect).toHaveBeenCalled());
  });

  test('provides the inner component with an adapterConnected prop', () => {
    expect(adapterConnectedChanged).toHaveBeenCalledWith(false);
    expect(adapterConnectedChanged).toHaveBeenLastCalledWith(true);
  });

  test('provides the inner component with an adapter instance on context', async () => {
    expect(contextAdapterChanged).toHaveBeenCalledWith(adapter);
  });

  test('calls the adapter disconnect function', async () => {
    expect(adapter.disconnect).not.toHaveBeenCalled();
    testRenderer.unmount();
    await waitForExpect(() => expect(adapter.disconnect).toHaveBeenCalled());
  });
});
