import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import OptionsList from '../OptionsList/OptionsList';
import webexComponentClasses from '../../helpers';
import {useRef} from '../../hooks';
import Label from '../../inputs/Label/Label';

/**
 * Select Component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  String that labels the current element
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled=false]  True when the control is disabled
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {Function} props.onChange  Action to perform on option selection
 * @param {object[]} [props.options]  Array of options
 * @param {string} [props.placeholder]  Placeholder to be displayed
 * @param {boolean} [props.required=false]  Flag indicating control required
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.tooltip]  Tooltip to be displayed
 * @param {string} [props.value]  Selected option
 * @returns {object}  JSX of the element
 */
export default function Select({
  ariaLabel,
  className,
  disabled,
  error,
  label: controlLabel,
  onChange,
  options,
  placeholder,
  required,
  style,
  tabIndex,
  tooltip,
  value,
}) {
  const [expanded, setExpanded] = useState(undefined);
  const [cssClasses, sc] = webexComponentClasses('select', className, {disabled});
  const label = options?.find((option) => option.value === value)?.label;
  const ref = useRef();

  const collapse = () => setExpanded(undefined);
  const expand = (withKey) => setExpanded({withKey});
  const toggleExpanded = (withKey) => {
    if (!disabled) {
      setExpanded(expanded ? undefined : {withKey});
    }
  };

  const handleOptionSelect = (option) => {
    collapse();
    onChange(option.value);
    ref.current.focus();
  };

  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      expand(true);
    } else if (event.key === 'Tab') {
      collapse();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      expand(true);
    }
  };

  useEffect(() => {
    let cleanup;

    if (expanded) {
      setTimeout(() => document.addEventListener('click', collapse));
      cleanup = () => document.removeEventListener('click', collapse);
    }

    return cleanup;
  }, [expanded]);

  return (
    <Label
      className={cssClasses}
      style={style}
      error={error}
      label={controlLabel}
      required={required}
    >
      <div className={sc('control')} disabled={disabled}>
        <div
          className={`${sc('selected-option')} ${expanded ? sc('expanded') : ''}`}
          onClick={() => toggleExpanded(false)}
          role="button"
          tabIndex={disabled ? -1 : tabIndex}
          title={tooltip}
          aria-label={`${label ? `${label}. ` : ''}${ariaLabel}`}
          onKeyDown={handleKeyDown}
          ref={ref}
        >
          <span className={sc('label')}>{options === null ? 'Loading...' : (label || value || placeholder)}</span>
          <Icon name={expanded ? 'arrow-up' : 'arrow-down'} size={13} />
        </div>
        {expanded && (
          <OptionsList
            className={sc('options-list')}
            options={options}
            onSelect={handleOptionSelect}
            withKey={expanded.withKey}
            selected={value}
            tabIndex={tabIndex}
            onBlur={collapse}
          />
        )}
      </div>
    </Label>
  );
}

Select.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  tooltip: PropTypes.string,
  value: PropTypes.string,
};

Select.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  disabled: false,
  error: undefined,
  label: undefined,
  options: [],
  placeholder: undefined,
  required: false,
  style: undefined,
  tabIndex: 0,
  tooltip: undefined,
  value: '',
};
