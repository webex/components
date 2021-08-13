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

};

/**
 * Displays an Icon based on its name.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.name  Icon name
 * @param {number} [props.size=24]  Icon width and height
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the Icon
 *
 */
export default function Icon({
  name, size, className, style,
}) {
  const baseName = name.split('_')[0];

  const IconComponent = icons[baseName];

  return (
    <>
      <IconComponent size={size} className={className} style={style} />
      <MomentumIcon name={`icon-${name}`} className="wxc-old-icon" />
    </>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Icon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
