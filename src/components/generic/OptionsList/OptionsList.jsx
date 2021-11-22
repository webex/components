import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import webexComponentClasses from '../../helpers';
import {useRef, useAutoFocus} from '../../hooks';

/**
 * Option Component
 *
 * @param {string} className  Custom CSS class to apply
 * @param {boolean} focused  Focused option
 * @param {Function} onKeyDown  A function that will be triggered when a key is pressed
 * @param {Function} onMouseEnter  A function that will be triggered on mouse hover
 * @param {Function} onSelect  A function which will be triggered on option selection
 * @param {object} option  An option from options list
 * @param {Function} sc  CSS subclass function
 * @param {string} selected  Selected option label
 * @param {number} tabIndex  Value of the parent's tabIndex
 * @returns {object} JSX of the element
 */
function Option({
  className,
  focused,
  onKeyDown,
  onMouseEnter,
  onSelect,
  option,
  sc,
  selected,
  tabIndex,
}) {
  const ref = useRef();

  useAutoFocus(ref, focused);

  return (
    <li
      aria-label={typeof option.label !== 'object' ? option.label : option.value}
      aria-selected={selected === option.value}
      className={className}
      key={option.value}
      role="option"
      ref={ref}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      title={typeof option.label !== 'object' && option.label}
    >
      {option.icon && <Icon name={option.icon} />}
      <span className={sc('label')}>{option.label}</span>
      {selected && <Icon className={classNames(sc('check'), {[sc('check--invisible')]: (selected !== option.value)})} size={16} name="check" />}
    </li>
  );
}

Option.propTypes = {
  className: PropTypes.string,
  focused: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  })).isRequired,
  sc: PropTypes.func,
  selected: PropTypes.string,
  tabIndex: PropTypes.number,
};

Option.defaultProps = {
  className: '',
  focused: undefined,
  onKeyDown: undefined,
  onMouseEnter: undefined,
  sc: undefined,
  selected: undefined,
  tabIndex: undefined,
};

/**
 * OptionsList Component
 *
 * @param {object} props  Data passed to the component
 * @param {object[]} props.options  Array of options
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.selected  Selected option label
 * @param {Function} [props.onBlur]  Called when this component loses focus
 * @param {Function} props.onSelect  A function which will be triggered on option selection
 * @param {number} props.tabIndex  Value of the parent's tabIndex
 * @returns {object}  JSX of the element
 */
export default function OptionsList({
  options,
  className,
  onBlur,
  onSelect,
  selected,
  tabIndex,
}) {
  const [cssClasses, sc] = webexComponentClasses('options-list', className);

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      const prevFocusedOption = (focusedOptionIndex + options.length - 1) % options.length;

      setFocusedOptionIndex(prevFocusedOption);
    } else if (event.key === 'ArrowDown') {
      const nextFocusedOption = (focusedOptionIndex + 1) % options.length;

      setFocusedOptionIndex(nextFocusedOption);
    } else if (event.key === 'Enter') {
      onSelect(options[focusedOptionIndex]);
    } else if (event.key === 'Tab') {
      onBlur();
    }
  };

  return (
    <div className={cssClasses}>
      <ul role="menu" className={sc('list')} tabIndex={tabIndex}>
        {options.map((option, index) => (
          <Option
            className={`${sc('option')} ${(focusedOptionIndex === index) && sc('option--focused')}`}
            focused={index === focusedOptionIndex}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setFocusedOptionIndex(index)}
            onSelect={() => onSelect(option)}
            option={option}
            sc={sc}
            selected={selected}
            tabIndex={tabIndex}
          />
        ))}
      </ul>
    </div>
  );
}

OptionsList.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  })),
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  tabIndex: PropTypes.number,
};

OptionsList.defaultProps = {
  className: '',
  onBlur: undefined,
  options: [],
  selected: '',
  tabIndex: undefined,
};
