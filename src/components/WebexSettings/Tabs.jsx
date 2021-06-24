import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import webexComponentClasses from '../helpers';

/**
 * @typedef {object} Tab
 * @property {string} key  Unique key for each tab
 * @property {string} heading  Tab heading text
 */

/**
 * Tabs component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {Function} props.onSelect  A callback to be executed on selecting active tab
 * @param {string} props.selected  Specifies which tab is active
 * @param {object} props.style  Custom style to apply
 * @param {Tab[]} props.tabs  The tabs to be rendered
 * @returns {object} JSX of the component
 *
 */
export default function Tabs({
  className,
  onSelect,
  selected,
  style,
  tabs,
}) {
  const {content} = tabs.find((tab) => tab.key === selected);
  const cssClasses = webexComponentClasses('tabs', className);

  return (
    <div className={cssClasses} style={style}>
      <ul className="tabs-list">
        {
          tabs.map((tab) => (
            <li
              className={classNames('tab', selected === tab.key && 'active')}
              key={tab.key}
            >
              <button
                onClick={() => onSelect(tab.key)}
                type="button"
              >
                {tab.heading}
              </button>
            </li>
          ))
        }
      </ul>
      <div className="tabs-content">
        {content()}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Tabs.defaultProps = {
  className: '',
  style: undefined,
};
