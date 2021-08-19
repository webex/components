import React from 'react';
import PropTypes from 'prop-types';
import {Icon as MomentumIcon} from '@momentum-ui/react';
import {
  CameraIcon,
  AudioMicrophoneIcon,
  AudioMicrophoneMutedIcon,
  SettingsIcon,
  ShareScreenIcon,
  CancelIcon,
  CameraMutedIcon,
  ParticipantListIcon,
  ExternalUserIcon,
  RemoteMediaErrorIcon,
  UnreadIcon,
  CameraPresenceIcon,
  MeetingsPresenceIcon,
  DndPresenceIcon,
  QuietHoursPresenceIcon,
  RecentsPresenceIcon,
  PtoPresenceIcon,
  ShareScreenFilledIcon,
} from '../../icons';

const icons = {
  'microphone-muted': AudioMicrophoneMutedIcon,
  microphone: AudioMicrophoneIcon,
  'camera-muted': CameraMutedIcon,
  camera: CameraIcon,
  'share-screen-presence-stroke': ShareScreenIcon,
  settings: SettingsIcon,
  cancel: CancelIcon,
  'participant-list': ParticipantListIcon,
  'external-user': ExternalUserIcon,
  error: RemoteMediaErrorIcon,
  unread: UnreadIcon,
  'camera-presence': CameraPresenceIcon,
  'meetings-presence': MeetingsPresenceIcon,
  'dnd-presence': DndPresenceIcon,
  'quiet-hours-presence': QuietHoursPresenceIcon,
  'recents-presence': RecentsPresenceIcon,
  'pto-presence': PtoPresenceIcon,
  'share-screen-filled': ShareScreenFilledIcon,
};

const oldIcons = {
  microphone_28: 'microphone-muted_28',
  camera_48: 'camera_36',
  microphone_48: 'microphone_36',
};

/**
 * Displays an Icon based on its name.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.name  Icon name
 * @param {number} [props.size]  Icon width and height
 * @param {string} props.className  Additional className for the component
 * @param {string} props.indicator  Additional otherBaseClass for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the Icon
 *
 */
export default function Icon({
  name, size, className, indicator, style,
}) {
  const [baseName, baseSize] = name.split('_');

  let IconComponent = icons[baseName];

  if (!IconComponent) {
    console.error(`${baseName} icon is not defined. Available icons are "${Object.keys(icons).join(', ')}".`);
    IconComponent = 'span';
  }

  return (
    <>
      <IconComponent
        size={size || baseSize}
        className={className}
        indicator={indicator}
        style={style}
      />
      <MomentumIcon name={`icon-${oldIcons[name] || name}`} className="wxc-old-icon" />
    </>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  indicator: PropTypes.string,
  style: PropTypes.shape(),
};

Icon.defaultProps = {
  size: undefined,
  className: '',
  indicator: '',
  style: {},
};
