import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import OptionsList from '../OptionsList/OptionsList';
import webexComponentClasses from '../../helpers';
import {useRef} from '../../hooks';

/**
 * Select Component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.value  Selected option
 * @param {object[]} props.options  Array of options
 * @param {Function} props.onChange  Action to perform on option selection
 * @param {boolean} props.disabled  True when the control is disabled
 * @param {string} props.tooltip  Tooltip to be displayed
 * @param {string} props.ariaLabel  String that labels the current element
 * @param {number} props.tabIndex  Value of the tabIndex
 * @returns {object}  JSX of the element
 */
export default function Select({
  className,
  value,
  options,
  onChange,
  disabled,
  tooltip,
  ariaLabel,
  tabIndex,
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
    <div className={cssClasses}>
      <div
        className={`${sc('selected-option')} ${expanded ? sc('expanded') : ''}`}
        onClick={() => toggleExpanded(false)}
        aria-hidden="true"
        role="button"
        tabIndex={tabIndex}
        title={tooltip}
        aria-label={`${label ? `${label}. ` : ''}${ariaLabel}`}
        onKeyDown={handleKeyDown}
        ref={ref}
      >
        <span className={sc('label')}>{label || value}</span>
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
  );
}

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  ariaLabel: PropTypes.string,
  tabIndex: PropTypes.number,
};

Select.defaultProps = {
  className: '',
  value: '',
  options: [],
  disabled: false,
  tooltip: undefined,
  ariaLabel: undefined,
  tabIndex: undefined,
};
