export default function useMeetingControl(type) {
  let control = {};

  switch (type) {
    case 'join-meeting':
      control = {
        ID: 'join-meeting',
        text: 'Join meeting',
        tooltip: 'Join meeting',
        state: 'active',
      };
      break;
    case 'mute-audio-active':
      control = {
        ID: 'mute-audio',
        icon: 'microphone',
        tooltip: 'Mute',
        state: 'active',
      };
      break;
    case 'mute-audio-inactive':
      control = {
        ID: 'mute-audio',
        icon: 'microphone-mute',
        tooltip: 'Unmute',
        state: 'inactive',
      };
      break;
    case 'join-meeting-disabled':
      control = {
        ID: 'join-meeting',
        text: 'Join meeting',
        tooltip: 'Join meeting disabled',
        state: 'disabled',
      };
      break;
    case 'mute-audio-disabled':
      control = {
        ID: 'mute-audio',
        icon: 'microphone',
        tooltip: 'Mute disabled',
        state: 'disabled',
      };
      break;
  }

  return [() => {}, control];
}
