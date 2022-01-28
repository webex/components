import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../../helpers';
import Option from './Option';

/**
 * OptionsList Component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {Function} props.onBlur  Called when this component loses focus
 * @param {Function} props.onSelect  A function which will be triggered on option selection
 * @param {object[]} props.options  Array of options
 * @param {string} props.selected  Selected option label
 * @param {number} props.tabIndex  Value of the parent's tabIndex
 * @param {boolean} props.withKey  Options list was opened with keyboard
 * @returns {object}  JSX of the element
 */
export default function OptionsList({
  className,
  onBlur,
  onSelect,
  options,
  selected,
  tabIndex,
  withKey,
}) {
  const [cssClasses, sc] = webexComponentClasses('options-list', className);

  const onKeyDown = (event) => {
    if (event.key === 'Tab') {
      onBlur();
    }
  };

  return (
    <div className={cssClasses}>
      <ul role="menu" className={sc('list')} tabIndex={tabIndex} onKeyDown={onKeyDown}>
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
    </div>
  );
}

OptionsList.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  })),
  selected: PropTypes.string,
  tabIndex: PropTypes.number,
  withKey: PropTypes.bool,
};

OptionsList.defaultProps = {
  className: '',
  onBlur: undefined,
  options: [],
  selected: '',
  tabIndex: 0,
  withKey: false,
};
