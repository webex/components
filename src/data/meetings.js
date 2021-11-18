import {MeetingState} from '@webex/component-adapter-interfaces';

export default {
  meeting1: {
    ID: 'meeting1',
    title: 'Weekly Backlog Grooming',
    localAudio: {
      stream: new MediaStream(),
    },
    localVideo: {
      stream: new MediaStream(),
    },
    localShare: {
      stream: new MediaStream(),
    },
    remoteAudio: new MediaStream(),
    remoteVideo: new MediaStream(),
    remoteShare: null,
    state: MeetingState.JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID1',
    speakerID: '',
  },
  meeting2: {
    ID: 'meeting2',
    title: 'Lunch and Learn',
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: new MediaStream(),
    remoteVideo: new MediaStream(),
    remoteShare: new MediaStream(),
    state: MeetingState.NOT_JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID2',
    microphoneID: 'microphoneID2',
    speakerID: '',
  },
  meeting3: {
    ID: 'meeting3',
    title: 'Quarterly Financial Report',
    localAudio: {
      stream: new MediaStream(),
    },
    localVideo: {
      stream: new MediaStream(),
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: MeetingState.NOT_JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID1',
    speakerID: '',
  },
  meeting4: {
    ID: 'meeting4',
    title: '1:1 Barbara/Brandon',
    localAudio: {
      stream: new MediaStream(),
    },
    localVideo: {
      stream: new MediaStream(),
    },
    localShare: {
      stream: new MediaStream(),
    },
    remoteAudio: new MediaStream(),
    remoteVideo: new MediaStream(),
    remoteShare: null,
    state: MeetingState.JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID1',
    speakerID: '',
  },
  meeting5: {
    ID: 'meeting5',
    title: 'Barbara German',
    localAudio: {
      stream: new MediaStream(),
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: new MediaStream(),
    remoteVideo: null,
    remoteShare: null,
    state: MeetingState.JOINED,
    showRoster: true,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID2',
    microphoneID: 'microphoneID2',
    speakerID: '',
  },
  meeting6: {
    ID: 'meeting6',
    title: 'Audio Trouble',
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: new MediaStream(),
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: new MediaStream(),
    remoteShare: null,
    state: MeetingState.JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID2',
    speakerID: '',
  },
  meeting7: {
    ID: 'meeting7',
    title: null,
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: null,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: null,
    microphoneID: null,
    speakerID: '',
  },
  meeting8: {
    ID: null,
    title: null,
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: MeetingState.LEFT,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: null,
    microphoneID: null,
    speakerID: '',
  },
  meeting9: {
    ID: null,
    title: null,
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: null,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: null,
    microphoneID: null,
    speakerID: '',
    error: true,
  },

  meeting10: {
    ID: 'meeting10',
    title: 'Feature Planning Meeting',
    localAudio: {
      stream: null,
    },
    localVideo: {
      stream: null,
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: MeetingState.NOT_JOINED,
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID1',
    speakerID: '',
    password: 'secret',
    hostKey: 'hostsecret',
  },
  meeting11: {
    ID: 'meeting11',
    title: 'Quarterly Financial Report',
    localAudio: {
      stream: new MediaStream(),
    },
    localVideo: {
      stream: new MediaStream(),
    },
    localShare: {
      stream: null,
    },
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    state: 'LOBBY',
    showRoster: false,
    settings: {
      visible: false,
      preview: {
        microphone: {},
        video: {},
      },
    },
    cameraID: 'cameraID1',
    microphoneID: 'microphoneID1',
    speakerID: '',
  },
};
