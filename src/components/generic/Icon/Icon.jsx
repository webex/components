import React from 'react';
import PropTypes from 'prop-types';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  AudioMicrophoneIcon,
  AudioMicrophoneMutedIcon,
  CameraBoldIcon,
  CameraIcon,
  CameraIssue,
  CameraMutedIcon,
  CameraPresenceIcon,
  CancelIcon,
  ChatFilledIcon,
  CheckIcon,
  ControlDown,
  ControlUp,
  DndPresenceIcon,
  ExternalUserIcon,
  HidePwdIcon,
  IndeterminateIcon,
  MeetingsPresenceIcon,
  MicrophoneBoldIcon,
  MicrophoneIssueIcon,
  MoreAdrIcon,
  MoreIcon,
  ParticipantListIcon,
  ParticipantListFilledIcon,
  PtoPresenceIcon,
  QuietHoursPresenceIcon,
  RecentsPresenceIcon,
  RemoteMediaErrorIcon,
  SettingsIcon,
  ShareScreenFilledIcon,
  ShowPwdIcon,
  ShareScreenIcon,
  UnreadIcon,
  WaitingForHostIcon,
  WarningIcon,
} from '../../icons';

const icons = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  check: CheckIcon,
  camera: CameraIcon,
  'camera-bold': CameraBoldIcon,
  'camera-issue': CameraIssue,
  'camera-muted': CameraMutedIcon,
  'camera-presence': CameraPresenceIcon,
  cancel: CancelIcon,
  'chat-filled': ChatFilledIcon,
  'content-share': ShareScreenIcon,
  'control-down': ControlDown,
  'control-up': ControlUp,
  'dnd-presence': DndPresenceIcon,
  error: RemoteMediaErrorIcon,
  'external-user': ExternalUserIcon,
  'hide-password': HidePwdIcon,
  indeterminate: IndeterminateIcon,
  'meetings-presence': MeetingsPresenceIcon,
  'microphone-issue': MicrophoneIssueIcon,
  'microphone-muted': AudioMicrophoneMutedIcon,
  microphone: AudioMicrophoneIcon,
  'microphone-bold': MicrophoneBoldIcon,
  more: MoreIcon,
  'more-adr': MoreAdrIcon,
  'participant-list': ParticipantListIcon,
  'participant-list-filled': ParticipantListFilledIcon,
  'pto-presence': PtoPresenceIcon,
  'quiet-hours-presence': QuietHoursPresenceIcon,
  'recents-presence': RecentsPresenceIcon,
  settings: SettingsIcon,
  'share-screen-presence-stroke': ShareScreenIcon,
  'share-screen-filled': ShareScreenFilledIcon,
  'show-password': ShowPwdIcon,
  unread: UnreadIcon,
  warning: WarningIcon,
  'waiting-for-host': WaitingForHostIcon,
};

/**
 * Displays an Icon based on its name.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.name  Icon name
 * @param {number} [props.size]  Icon width and height
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @param {string} props.ariaLabel  Aria-label for accessibility
 * @returns {object} JSX of the Icon
 *
 */
export default function Icon({
  name, size, className, style, ariaLabel,
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
      ariaLabel={ariaLabel}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
  ariaLabel: PropTypes.string,
};

Icon.defaultProps = {
  size: undefined,
  className: '',
  style: {},
  ariaLabel: undefined,
};
