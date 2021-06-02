import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Select component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object[]} props.options  Array of options
 * @param {string} props.options[].value  The value of the option
 * @param {string} props.options[].label  The label of the option
 *
 * @returns {object}  JSX of the element
 */
export default function Select({className, options, ...props}) {
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-select`]: true,
    [className]: !!className,
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={classNames(mainClasses)} {...props}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
};

Select.defaultProps = {
  className: '',
  options: [],
};
