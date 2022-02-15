import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../constants';

/**
 * Builds a string of css class names for webex components
 *
 * @param {string} classBaseName  Component class base name
 * @param {string} [userClassName]  Custom CSS class to apply
 * @param {object} otherClasses  Other optional classes with prefix
 * @returns {[string, function]}  Classes and a prefix function
 *
 */
export default function webexComponentClasses(
  classBaseName,
  userClassName,
  otherClasses,
) {
  const userClassNames = Array.isArray(userClassName) ? userClassName : [userClassName];

  const cssClasses = classNames(
    'wxc',
    `${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}`,
    ...userClassNames,
    {
      ...Object.fromEntries(
        Object.entries(otherClasses || {})
          .map(([key, val]) => [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}--${key}`, val]),
      ),
    },
  );

  const sc = (subclass) => `${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}__${subclass}`;

  return [cssClasses, sc];
}

//  checks for support for setSinkId https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
export const isSpeakerSupported = !!document.createElement('audio').setSinkId;
