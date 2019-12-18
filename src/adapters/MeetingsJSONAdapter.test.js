import {from} from 'rxjs';
import {tap, skip} from 'rxjs/operators';

import meetings from './../data/meetings';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  let meetingsJSONAdapter, meetingID;

  beforeEach(() => {
    [meetingID] = Object.keys(meetings);
    meetingsJSONAdapter = new MeetingsJSONAdapter(meetings);
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
  });

  describe('getMeeting()', () => {
    test('returns an observable', () => {
      expect(rxjs.isObservable(meetingsJSONAdapter.getMeeting())).toBeTruthy();
    });

    test('returns meeting data', (done) => {
      meetingsJSONAdapter.getMeeting(meetingID).subscribe((data) => {
        expect(data).toEqual(meetings[meetingID]);
        done();
      });
    });

    test('renders the local media if localVideo property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('localVideo').subscribe((data) => {
        expect(data.localVideo).toEqual(['remote-video']);
        done();
      });
    });

    test('renders the remote video if remoteVideo property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteVideo').subscribe((data) => {
        expect(data.remoteVideo).toEqual(['remote-video']);
        done();
      });
    });

    test('renders the remote audio if remoteAudio property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteAudio').subscribe((data) => {
        expect(data.remoteAudio).toEqual(['remote-audio']);
        done();
      });
    });

    test('renders the remote audio if both remoteAudio and remoteVideo properties are defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteAudio&Video').subscribe((data) => {
        expect(data).toMatchObject({remoteAudio: ['remote-audio'], remoteVideo: ['remote-video']});
        done();
      });
    });

    test('returns meeting data from mute event', (done) => {
      meetingID = 'localAudio';

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(tap(() => meetingsJSONAdapter.toggleMuteAudio(meetingID)))
        .subscribe((meeting) => {
          expect(meeting.localAudio.muted).toBeTruthy();
          done();
        });
    });

    test('throws a proper error message', (done) => {
      const wrongMeetingID = 'wrongMeetingID';

      meetingsJSONAdapter.getMeeting(wrongMeetingID).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe(`Could not find meeting with ID "${wrongMeetingID}"`);
          done();
        }
      );
    });
  });

  describe('muteAudioControl() returns', () => {
    beforeEach(() => {
      meetingID = 'localAudio';
    });

    test('active control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => from([{detail: meetings[meetingID]}]));

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone-muted',
            tooltip: 'Unmute',
            state: 'active',
          });
          done();
        });
    });

    test('inactive control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => {
        const meeting = meetings[meetingID];

        meeting.localAudio.muted = false; // Local audio is already muted

        return from([{detail: meeting}]);
      });

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone',
            tooltip: 'Mute',
            state: 'inactive',
          });
          done();
        });
    });

    test('error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.muteAudioControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        }
      );
    });
  });

  describe('toggleMuteAudio()', () => {
    test('dispatches a "mute-audio" event', () => {
      meetingID = 'localAudio';

      meetingsJSONAdapter.toggleMuteAudio(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });
});
