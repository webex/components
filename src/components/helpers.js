import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../constants';

/**
 * Builds a string of css class names for webex components
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.classBaseName  Component class base name
 * @param {string} props.userClassName  Custom CSS class to apply
 * @param {object} props.otherClasses  Other optional classes with prefix
 * @returns {string} Classes
 */

export default function webexComponentClasses(
  classBaseName,
  userClassName,
  otherClasses,
) {
  const cssClasses = classNames({
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}`]: true,
    [userClassName]: !!userClassName,
    ...Object.fromEntries(
      Object.entries(otherClasses || {})
        .map(([key, val]) => [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}--${key}`, val]),
    ),
  });

  const sc = (subclass) => `${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}__${subclass}`;

  return [cssClasses, sc];
}

//  checks for support for setSinkId https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
export const isSpeakerSupported = !!document.createElement('audio').setSinkId;
