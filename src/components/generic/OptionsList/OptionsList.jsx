import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import webexComponentClasses from '../../helpers';

/**
 * OptionsList Component
 *
 * @param {object} props  Data passed to the component
 * @param {object[]} props.options  Array of options
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.selected  Selected option label
 * @param {Function} props.onSelect  A function which will be triggerd on option selection
 * @returns {object}  JSX of the element
 */
export default function OptionsList({
  options,
  className,
  onSelect,
  selected,
}) {
  const [cssClasses, sc] = webexComponentClasses('options-list', className);

  return (
    <div className={cssClasses}>
      <ul role="menu">
        {options.map((option) => (
          <li
            className={sc('option')}
            key={option.value}
            onClick={() => onSelect(option)}
            aria-hidden="true"
            role="option"
            aria-selected
            tabIndex="0"
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
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.string,
  })),
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

OptionsList.defaultProps = {
  className: '',
  options: [],
  selected: '',
};
