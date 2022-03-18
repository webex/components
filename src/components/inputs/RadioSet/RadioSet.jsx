import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Label from '../Label/Label';
import RadioButton from '../RadioButton/RadioButton';
import {uniqueId} from '../../../util';

/**
 * RadioSet component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.error]  Error message
 * @param {string} [props.id]  DOM id
 * @param {string} [props.label]  Label text
 * @param {Function} props.onChange  Action to perform on radio change
 * @param {object[]} props.options  Options
 * @param {string} props.options[].label  Option label
 * @param {string} props.options[].value  Option value
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {string} [props.selected]  Selected option
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the element
 */
export default function RadioSet({
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
  const [cssClasses] = webexComponentClasses('radio-set', className);
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
      <div
        aria-describedby={error && `${id}-error`}
        aria-invalid={error ? 'true' : 'false'}
        aria-labelledby={`${id}-label`}
        role="radiogroup"
      >
        {
          options.map((option, index) => (
            <RadioButton
              onChange={(isSelected) => onChange(option.value, isSelected)}
              key={index}
              selected={option.value === selected}
              tabIndex={(selected === option.value || (!selected && index === 0)) ? 0 : -1}
              title={option.label}
            />
          ))
        }
      </div>
    </Label>
  );
}

RadioSet.propTypes = {
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
  selected: PropTypes.string,
  style: PropTypes.shape(),
};

RadioSet.defaultProps = {
  className: undefined,
  error: undefined,
  id: undefined,
  label: undefined,
  required: false,
  selected: undefined,
  style: undefined,
};
