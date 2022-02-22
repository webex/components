import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {useElementPosition, useRef} from '../../hooks';

import Icon from '../../generic/Icon/Icon';
import OptionsList from '../../generic/OptionsList/OptionsList';
import Label from '../Label/Label';
import {uniqueId} from '../../../util';

/**
 * Dropdown Component
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
export default function Dropdown({
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
  const [layout, setLayout] = useState(undefined);
  const [cssClasses, sc] = webexComponentClasses('dropdown', className, {disabled});
  const label = options?.find((option) => option.value === value)?.label;
  const controlRef = useRef();
  const selectedOptionRef = useRef();
  const position = useElementPosition(controlRef);
  const labelId = uniqueId();
  const optionsId = uniqueId();

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
    selectedOptionRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.stopPropagation();
      collapse();
    }
  };

  const handleSelectedOptionKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); // prevent page scrolling
      expand(true);
    } else if (event.key === 'Tab') {
      collapse();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // prevent page scrolling
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

  useEffect(() => {
    if (position) {
      setLayout({
        maxHeight: window.innerHeight - position.bottom - window.scrollY - 24,
        minWidth: position.width,
        top: position.bottom + 4,
      });
    }
  }, [position]);

  useEffect(() => {
    let cleanup;

    if (expanded) {
      const handleScroll = (event) => {
        if (controlRef.current && !controlRef.current.contains(event.target)) {
          collapse();
        }
      };

      window.addEventListener('scroll', handleScroll, true);

      cleanup = () => window.removeEventListener('scroll', handleScroll, true);
    }

    return cleanup;
  }, [expanded, controlRef]);

  return (
    <Label
      className={cssClasses}
      style={style}
      error={error}
      labelId={labelId}
      label={controlLabel}
      required={required}
    >
      {/* This element handles delegated keyboard events from its descendants (Esc key) */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={sc('control')} ref={controlRef} disabled={disabled} onKeyDown={handleKeyDown}>
        <div
          aria-controls={optionsId}
          aria-expanded={expanded}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-labelledby={labelId}
          className={`${sc('selected-option')} ${expanded ? sc('expanded') : ''}`}
          onClick={() => toggleExpanded(false)}
          role="combobox"
          tabIndex={disabled ? -1 : tabIndex}
          title={tooltip}
          onKeyDown={handleSelectedOptionKeyDown}
          ref={selectedOptionRef}
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
            style={layout}
            tabIndex={tabIndex}
            onBlur={collapse}
            id={optionsId}
            labelId={labelId}
          />
        )}
      </div>
    </Label>
  );
}

Dropdown.propTypes = {
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

Dropdown.defaultProps = {
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
