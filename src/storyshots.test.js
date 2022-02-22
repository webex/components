import initStoryshots, {Stories2SnapsConverter} from '@storybook/addon-storyshots';
import TestRenderer from 'react-test-renderer';

// useActivityScroll hook has a half second timeout
// Mocking as it does not allow tests to complete on time
// Cannot user fake timers because expect in snapshot relies on a timeout
jest.mock('./components/hooks/useActivityScroll');

// useElementDimensions uses Resize Observer API which expects a real Element
jest.mock('./components/hooks/useElementDimensions');
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node) => node,
  };
});

jest.mock('./util', () => ({
  ...jest.requireActual('./util'),
  uniqueId: () => 'wxc-0',
}));

/**
 * Returns a mock DOM ref object for use of snapshot tests.
 *
 * @param {object} element Element to snapshot
 * @returns {object} Mocked element
 */
function createNodeMock(element) {
  return {
    ...element,
    getBoundingClientRect: () => ({}),
    scrollIntoView: () => ({}),
    focus: () => undefined,
    setSinkId: () => Promise.resolve(),
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  };
}

initStoryshots({
  asyncJest: true,
  test: ({story, context, done}) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);

    if (story.id === 'platform-webex-avatar--invalid') {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    }
    let tree;

    global.testRendererAct = TestRenderer.act;

    TestRenderer.act(() => {
      tree = TestRenderer.create(story.render(), {createNodeMock});

      // Because observables are async, execute snapshot tests on next event loop cycle
      setTimeout(() => {
        if (snapshotFilename) {
          expect(tree.toJSON())
            .toMatchSpecificSnapshot(snapshotFilename);
        }
        if (story.id === 'platform-webex-avatar--invalid') {
          /* eslint-disable no-console */
          expect(console.error).toHaveBeenCalledTimes(1);
          expect(console.error).toHaveBeenCalledWith('Could not find person with ID "user-7"');
          /* eslint-enable no-console */
        }
        done();
      }, 0);
    });
  },
});
