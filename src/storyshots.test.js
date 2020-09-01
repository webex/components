import initStoryshots, {Stories2SnapsConverter} from '@storybook/addon-storyshots';
import TestRenderer from 'react-test-renderer';

// useActivityScroll hook has a half second timeout
// Mocking as it does not allow tests to complete on time
// Cannot user fake timers because expect in snapshot relies on a timeout
jest.mock('./components/hooks/useActivityScroll');

// useElementDimensions uses Resize Observer API which expects a real Element
jest.mock('./components/hooks/useElementDimensions');

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
  };
}

initStoryshots({
  asyncJest: true,
  test: ({story, context, done}) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const tree = TestRenderer.create(story.render(), {createNodeMock});

    // Because observables are async, execute snapshot tests on next event loop cycle
    setTimeout(() => {
      if (snapshotFilename) {
        expect(tree.toJSON()).toMatchSpecificSnapshot(snapshotFilename);
      }
      done();
    }, 0);
  },
});
