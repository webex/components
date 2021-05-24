import initStoryshots, {Stories2SnapsConverter} from '@storybook/addon-storyshots';
import TestRenderer from 'react-test-renderer';

// useActivityScroll hook has a half second timeout
// Mocking as it does not allow tests to complete on time
// Cannot user fake timers because expect in snapshot relies on a timeout
jest.mock('./components/hooks/useActivityScroll');

// useElementDimensions uses Resize Observer API which expects a real Element
jest.mock('./components/hooks/useElementDimensions');

// Mock react-uid to maintain a fixed ID for Momentum UI buttons
jest.mock('react-uid', () => ({
  __esModule: true,
  UIDConsumer: ({children}) => children('md-button-0', 'md-button-0'),
}));

const availableMediaDevices = [
  {
    deviceId: '2a9f83242466302e2130134a57162f3562c59bd9ea34daa7f6fc2ad43a29265b',
    groupId: 'b9b73a85ee53c0cdeabde810ed62ee0d7dac35c3bbd4ec3be0eca52cd65a5d86',
    kind: 'videoinput',
    label: 'Logitech HD Webcam C525 (046d:0826)',
  },
  {
    deviceId: 'fd8f12fdced8098aaac31836c8b98960727060b57d48148e15cc34ad4ba1394a',
    groupId: 'f623e86b9003eb72600e1240cb6b64917acbde9fd7db471013c4d6225de9e58a',
    kind: 'audioinput',
    label: 'Microphone (HD Webcam C525) (046d:0826)',
  },
];

const mediaDevicesMock = {
  enumerateDevices: jest.fn(() => Promise.resolve(availableMediaDevices)),
};

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
  };
}

initStoryshots({
  asyncJest: true,
  test: ({story, context, done}) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    let tree;

    global.navigator.mediaDevices = mediaDevicesMock;
    global.testRendererAct = TestRenderer.act;

    TestRenderer.act(() => {
      tree = TestRenderer.create(story.render(), {createNodeMock});

      // Because observables are async, execute snapshot tests on next event loop cycle
      setTimeout(() => {
        if (snapshotFilename) {
          expect(tree.toJSON()).toMatchSpecificSnapshot(snapshotFilename);
        }
        done();
      }, 0);
    });
  },
});
