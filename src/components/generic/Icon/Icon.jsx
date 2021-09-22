import React from 'react';
import PropTypes from 'prop-types';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  AudioMicrophoneIcon,
  AudioMicrophoneMutedIcon,
  CameraIcon,
  CameraIssue,
  CameraMutedIcon,
  CameraPresenceIcon,
  CancelIcon,
  ChatFilledIcon,
  CheckIcon,
  DndPresenceIcon,
  ExternalUserIcon,
  HidePwdIcon,
  MeetingsPresenceIcon,
  MicrophoneIssueIcon,
  MoreAdrIcon,
  MoreIcon,
  ParticipantListIcon,
  PtoPresenceIcon,
  QuietHoursPresenceIcon,
  RecentsPresenceIcon,
  RemoteMediaErrorIcon,
  SettingsIcon,
  ShareScreenFilledIcon,
  ShowPwdIcon,
  ShareScreenIcon,
  UnreadIcon,
  WarningIcon,
} from '../../icons';

const icons = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  check: CheckIcon,
  camera: CameraIcon,
  'camera-issue': CameraIssue,
  'camera-muted': CameraMutedIcon,
  'camera-presence': CameraPresenceIcon,
  cancel: CancelIcon,
  'content-share': ShareScreenIcon,
  'dnd-presence': DndPresenceIcon,
  error: RemoteMediaErrorIcon,
  'external-user': ExternalUserIcon,
  'hide-password': HidePwdIcon,
  'meetings-presence': MeetingsPresenceIcon,
  'microphone-issue': MicrophoneIssueIcon,
  'microphone-muted': AudioMicrophoneMutedIcon,
  microphone: AudioMicrophoneIcon,
  more: MoreIcon,
  'more-adr': MoreAdrIcon,
  'participant-list': ParticipantListIcon,
  'pto-presence': PtoPresenceIcon,
  'quiet-hours-presence': QuietHoursPresenceIcon,
  'recents-presence': RecentsPresenceIcon,
  settings: SettingsIcon,
  'share-screen-presence-stroke': ShareScreenIcon,
  'share-screen-filled': ShareScreenFilledIcon,
  'show-password': ShowPwdIcon,
  unread: UnreadIcon,
  warning: WarningIcon,
  'chat-filled': ChatFilledIcon,
};

/**
 * Displays an Icon based on its name.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.name  Icon name
 * @param {number} [props.size]  Icon width and height
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the Icon
 *
 */
export default function Icon({
  name, size, className, style,
}) {
  const [baseName, baseSize] = name.split('_');

  let IconComponent = icons[baseName];

  if (!IconComponent) {
    console.error(`${baseName} icon is not defined. Available icons are "${Object.keys(icons).join(', ')}".`);
    IconComponent = 'span';
  }

  return (
    <IconComponent
      size={size || (baseSize && Number(baseSize))}
      className={className}
      style={style}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Icon.defaultProps = {
  size: undefined,
  className: '',
  style: {},
};
