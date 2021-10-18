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
 * @param {number} props.tabIndex  Tab index html attribute
 * @returns {object} JSX of the component
 */
export default function Tabs({
  className,
  onSelect,
  selected,
  style,
  tabs,
  tabIndex,
}) {
  const {content} = tabs.find((tab) => tab.key === selected);
  const [cssClasses, sc] = webexComponentClasses('tabs', className);
  const selectedTabIndex = (tabs || []).findIndex((tab) => tab.key === selected);

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft') {
      const prevTabIndex = (selectedTabIndex + tabs.length - 1) % tabs.length;

      onSelect(tabs[prevTabIndex].key);
    } else if (event.key === 'ArrowRight') {
      const nextTabIndex = (selectedTabIndex + 1) % tabs.length;

      onSelect(tabs[nextTabIndex].key);
    }
  };

  return (
    <div className={cssClasses} style={style}>
      {/* eslint-disable-next-line */}
      <ul
        className={sc('list')}
        tabIndex={tabIndex}
        onKeyUp={handleKeyUp}
      >
        {
          tabs.map((tab) => (
            <li
              className={classNames(sc('tab'), selected === tab.key && sc('tab--active'))}
              key={tab.key}
            >
              <button
                onClick={() => onSelect(tab.key)}
                type="button"
                tabIndex={-1}
              >
                {tab.heading}
              </button>
            </li>
          ))
        }
      </ul>
      <div className={sc('content')}>
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
  tabIndex: PropTypes.number,
};

Tabs.defaultProps = {
  className: '',
  style: undefined,
  tabIndex: -1,
};
