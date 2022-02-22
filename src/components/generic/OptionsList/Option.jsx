import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import {useRef, useAutoFocus} from '../../hooks';
import webexComponentClasses from '../../helpers';

/**
 * Option Component
 *
 * @param {boolean} autoFocus  Focused option
 * @param {string} className  Custom CSS class to apply
 * @param {Function} onMouseEnter  A function that will be triggered on mouse hover
 * @param {Function} onSelect  A function which will be triggered on option selection
 * @param {object} option  An option from options list
 * @param {string} selected  Selected option label
 * @param {number} tabIndex  Value of the parent's tabIndex
 * @returns {object} JSX of the element
 */
export default function Option({
  autoFocus,
  className,
  onMouseEnter,
  onSelect,
  option,
  selected,
  tabIndex,
}) {
  const ref = useRef();
  const [cssClasses, sc] = webexComponentClasses('option', className);

  useAutoFocus(ref, autoFocus);

  const onKeyDown = (event) => {
    let toFocus;

    if (event.key === 'ArrowUp') {
      event.preventDefault(); // prevent page scrolling
      toFocus = ref.current.previousElementSibling;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault(); // prevent page scrolling
      toFocus = ref.current.nextElementSibling;
    } else if (event.key === 'Enter') {
      onSelect(option, true);
    }
    if (toFocus) {
      toFocus.focus();
    }
  };

  return (
    <li
      aria-selected={selected === option.value}
      className={cssClasses}
      key={option.value}
      role="option"
      ref={ref}
      onClick={() => onSelect(option, false)}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      title={typeof option.label !== 'object' ? option.label : undefined}
    >
      {option.icon && <Icon name={option.icon} />}
      <span className={sc('label')}>{option.label}</span>
      {selected !== undefined && <Icon className={classNames(sc('check'), {[sc('check--invisible')]: (selected !== option.value)})} size={16} name="check" />}
    </li>
  );
}

Option.propTypes = {
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  }).isRequired,
  selected: PropTypes.string,
  tabIndex: PropTypes.number,
};

Option.defaultProps = {
  className: '',
  autoFocus: undefined,
  onMouseEnter: undefined,
  selected: undefined,
  tabIndex: 0,
};
