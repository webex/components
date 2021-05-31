import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Tabs component
 *
 * @param {object} props  Data passed to the component
 * @param {object[]} props.tabs  The tabs to be rendered
 * @param {string} props.tabs[].key  Unique key for each tab
 * @param {string} props.tabs[].heading  Tab heading text
 * @param {string} props.selected  Specifies which tab is active
 * @param {Function} props.onSelect  A callback to be executed on selecting active tab
 *
 * @returns {object} JSX of the component
 */

export default function Tabs({tabs, selected, onSelect}) {
  const {content} = tabs.find((tab) => tab.key === selected);

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-tabs`}>
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
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
