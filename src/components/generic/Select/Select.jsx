import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import OptionsList from '../OptionsList/OptionsList';
import webexComponentClasses from '../../helpers';

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
 * @returns {object}  JSX of the element
 */
export default function Select({
  className,
  value,
  options,
  onChange,
  disabled,
  tooltip,
}) {
  const [expanded, setExpanded] = useState(false);
  const [cssClasses, sc] = webexComponentClasses('select', className, {disabled});
  const label = options?.find((option) => option.value === value)?.label;

  const toggleExpanded = () => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  };

  const handleOptionSelect = (option) => {
    setExpanded(false);
    onChange(option.value);
  };

  const onOutsideClick = () => setExpanded(false);

  useEffect(() => {
    let cleanup;

    if (expanded) {
      document.addEventListener('click', onOutsideClick);
      cleanup = () => document.removeEventListener('click', onOutsideClick);
    }

    return cleanup;
  }, [expanded]);

  return (
    <div className={cssClasses}>
      <div
        className={`${sc('selected-option')} ${expanded ? sc('expanded') : ''}`}
        onClick={() => toggleExpanded()}
        aria-hidden="true"
        role="button"
        tabIndex="0"
        title={tooltip}
      >
        <span className={sc('label')}>{label || value}</span>
        <Icon name={expanded ? 'arrow-up' : 'arrow-down'} size={13} />
      </div>
      {expanded && (
        <OptionsList
          className={sc('options-list')}
          options={options}
          onSelect={(option) => handleOptionSelect(option)}
          selected={value}
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
};

Select.defaultProps = {
  className: '',
  value: '',
  options: [],
  disabled: false,
  tooltip: undefined,
};
