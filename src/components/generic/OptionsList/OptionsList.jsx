import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

import Option from './Option';

/**
 * OptionsList Component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} [props.id]  Options list id
 * @param {string} [props.labelId]  Label id
 * @param {Function} props.onBlur  Called when this component loses focus
 * @param {Function} props.onSelect  A function which will be triggered on option selection
 * @param {object[]} props.options  Array of options
 * @param {string} props.selected  Selected option label
 * @param {object} props.style  Custom style to apply
 * @param {number} props.tabIndex  Value of the parent's tabIndex
 * @param {boolean} props.withKey  Options list was opened with keyboard
 * @returns {object}  JSX of the element
 */
export default function OptionsList({
  className,
  id,
  labelId,
  onBlur,
  onSelect,
  options,
  selected,
  style,
  tabIndex,
  withKey,
}) {
  const [cssClasses] = webexComponentClasses('options-list', className);

  const onKeyDown = (event) => {
    if (event.key === 'Tab') {
      onBlur();
    }
  };

  return (
    <ul
      className={cssClasses}
      style={style}
      aria-labelledby={labelId}
      id={id}
      onKeyDown={onKeyDown}
      role="listbox"
      tabIndex={tabIndex}
    >
      {options.map((option, index) => (
        <Option
          key={option.value}
          autoFocus={withKey && (option.value === selected || index === 0)}
          onSelect={onSelect}
          option={option}
          selected={selected}
          tabIndex={tabIndex}
        />
      ))}
    </ul>
  );
}

OptionsList.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  labelId: PropTypes.string,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  })),
  selected: PropTypes.string,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  withKey: PropTypes.bool,
};

OptionsList.defaultProps = {
  className: '',
  id: undefined,
  labelId: undefined,
  onBlur: undefined,
  options: [],
  selected: '',
  style: undefined,
  tabIndex: 0,
  withKey: false,
};
