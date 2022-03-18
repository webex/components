import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Label from '../Label/Label';
import Checkbox from '../Checkbox/Checkbox';
import {uniqueId} from '../../../util';

/**
 * CheckboxSet component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.error]  Error message
 * @param {string} [props.id]  DOM id
 * @param {string} [props.label]  Label text
 * @param {Function} props.onChange  Action to perform on checkbox change
 * @param {object[]} props.options  Options
 * @param {string} props.options[].label  Option label
 * @param {string} props.options[].value  Option value
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {object} [props.selected]  Selected options
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the element
 */
export default function CheckboxSet({
  className,
  error,
  id: domId,
  label,
  onChange,
  options,
  required,
  selected,
  style,
}) {
  const [cssClasses] = webexComponentClasses('checkbox-set', className);
  const id = domId || uniqueId();

  return (
    <Label
      className={cssClasses}
      error={error}
      id={id}
      label={label}
      required={required}
      style={style}
    >
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <div
        aria-describedby={error && `${id}-error`}
        aria-invalid={error ? 'true' : 'false'}
        aria-labelledby={`${id}-label`}
        role="group"
      >
        {
          options.map((option, index) => (
            <Checkbox
              key={index}
              onChange={(isSelected) => onChange(option.value, isSelected)}
              selected={selected[option.value]}
              title={option.label}
            />
          ))
        }
      </div>
    </Label>
  );
}

CheckboxSet.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  required: PropTypes.bool,
  selected: PropTypes.shape(),
  style: PropTypes.shape(),
};

CheckboxSet.defaultProps = {
  className: undefined,
  error: undefined,
  id: undefined,
  label: undefined,
  required: false,
  selected: undefined,
  style: undefined,
};
