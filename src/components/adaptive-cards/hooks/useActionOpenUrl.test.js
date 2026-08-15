import React from 'react';
import PropTypes from 'prop-types';
import {create, act} from 'react-test-renderer';
import AdaptiveCardContext from '../context/adaptive-card-context';
import useActionOpenUrl from './useActionOpenUrl';

/**
 * Test component that renders hook attributes onto a div.
 *
 * @param {object} props - Component props.
 * @param {object} props.data - Action data passed to the hook.
 * @returns {React.ReactElement} A div element with hook-provided attributes.
 */
function TestComponent({data}) {
  const attrs = useActionOpenUrl(data);

  return <div data-testid="target" {...attrs} />;
}

TestComponent.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

/**
 * Renders the TestComponent inside an AdaptiveCardContext and returns the renderer.
 *
 * @param {object} data - Action data for the hook.
 * @param {object} contextValue - Context value to provide.
 * @returns {object} The react-test-renderer instance.
 */
function renderHook(data, contextValue = {onOpenUrl: jest.fn()}) {
  let renderer;

  act(() => {
    renderer = create(
      <AdaptiveCardContext.Provider value={contextValue}>
        <TestComponent data={data} />
      </AdaptiveCardContext.Provider>,
    );
  });

  return renderer;
}

describe('useActionOpenUrl', () => {
  let openSpy;

  beforeEach(() => {
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  describe('AC-2: noopener,noreferrer and allow-list gating', () => {
    test('opens valid url with noopener,noreferrer', () => {
      const data = {type: 'Action.OpenUrl', url: 'https://example.com/page'};
      const onOpenUrl = jest.fn();
      const renderer = renderHook(data, {onOpenUrl});
      const {root} = renderer;
      const div = root.findByProps({'data-testid': 'target'});

      act(() => {
        div.props.onClick();
      });

      expect(openSpy).toHaveBeenCalledWith(
        'https://example.com/page',
        '_blank',
        'noopener,noreferrer',
      );
    });

    test('rejects loopback http URL — no action and window.open not called', () => {
      const data = {type: 'Action.OpenUrl', url: 'http://127.0.0.1/admin'};
      const renderer = renderHook(data);
      const {root} = renderer;
      const div = root.findByProps({'data-testid': 'target'});

      expect(div.props.onClick).toBeUndefined();
      expect(openSpy).not.toHaveBeenCalled();
    });

    test('rejects javascript: scheme — no action and window.open not called', () => {
      // eslint-disable-next-line no-script-url
      const data = {type: 'Action.OpenUrl', url: 'javascript:alert(1)'};
      const renderer = renderHook(data);
      const {root} = renderer;
      const div = root.findByProps({'data-testid': 'target'});

      expect(div.props.onClick).toBeUndefined();
      expect(openSpy).not.toHaveBeenCalled();
    });

    test('returns no attributes for non-OpenUrl action type', () => {
      const data = {type: 'Action.Submit', url: 'https://example.com'};
      const renderer = renderHook(data);
      const {root} = renderer;
      const div = root.findByProps({'data-testid': 'target'});

      expect(div.props.onClick).toBeUndefined();
    });
  });
});
