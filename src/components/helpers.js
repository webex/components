import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../constants';

/**
 * Builds a string of css class names for webex components
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.classBaseName  Component class base name
 * @param {string} props.userClassName  Custom CSS class to apply
 * @param {object} props.otherBaseClasses  Other optional classes with prefix
 * @param {object} props.otherClasses  Other optional classes
 * @returns {string} Classes
 */

export default function webexComponentClasses(
  classBaseName,
  userClassName,
  otherBaseClasses,
  otherClasses,
) {
  return classNames({
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}`]: true,
    [userClassName]: !!userClassName,
    ...Object.fromEntries(
      Object.entries(otherBaseClasses || {})
        .map(([key, val]) => [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}-${key}`, val]),
    ),
    ...otherClasses,
  });
}

//  checks for support for setSinkId https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
export const isSpeakerSupported = !!document.createElement('audio').setSinkId;
