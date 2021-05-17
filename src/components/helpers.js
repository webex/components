import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../constants';

/**
 * Builds a string of css class names for webex components
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.classBaseName  Component class base name
 * @param {string} props.userClassName  Custom CSS class to apply
 * @param {object} props.otherClasses  Other optional classes
 * @returns {string} Classes
 */

export default function webexComponentClasses(classBaseName, userClassName, otherClasses) {
  return classNames({
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}`]: true,
    [userClassName]: !!userClassName,
    ...otherClasses,
  });
}
