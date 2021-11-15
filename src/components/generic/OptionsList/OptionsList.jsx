import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import webexComponentClasses from '../../helpers';
import {useRef, useAutoFocus} from '../../hooks';

/**
 * OptionsList Component
 *
 * @param {object} props  Data passed to the component
 * @param {object[]} props.options  Array of options
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.selected  Selected option label
 * @param {Function} [props.onBlur]  Called when this component loses focus
 * @param {Function} props.onSelect  A function which will be triggerd on option selection
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

  const optionListRef = useRef();

  useAutoFocus(optionListRef, true);

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
    }
  };

  return (
    <div className={cssClasses}>
      <ul role="menu" className={sc('list')} onKeyDown={onKeyDown} tabIndex={tabIndex} ref={optionListRef} onBlur={onBlur}>
        {options.map((option, index) => (
          <li
            className={`${sc('option')} ${(focusedOptionIndex === index) && sc('option--focused')}`}
            key={option.value}
            onClick={() => onSelect(option)}
            onMouseEnter={() => setFocusedOptionIndex(index)}
            aria-hidden="true"
            role="option"
            aria-selected={selected === option.value}
            title={option.label}
          >
            {option.icon && <Icon name={option.icon} />}
            <span className={sc('label')}>{option.label}</span>
            {selected && <Icon className={classNames(sc('check'), {[sc('check--invisible')]: (selected !== option.value)})} size={16} name="check" />}
          </li>
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
