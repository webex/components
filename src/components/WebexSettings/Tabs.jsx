import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useAutoFocus, useRef} from '../hooks';
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
 * @param {boolean} props.autoFocus   Flag indicating whether to add autofocus on selected tab
 * @param {string} props.className  Custom CSS class to apply
 * @param {Function} props.onSelect  A callback to be executed on selecting active tab
 * @param {string} props.selected  Specifies which tab is active
 * @param {object} props.style  Custom style to apply
 * @param {Tab[]} props.tabs  The tabs to be rendered
 * @param {number} props.tabIndex  Tab index html attribute
 * @returns {object} JSX of the component
 */
export default function Tabs({
  autoFocus,
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
  const ref = useRef();
  const [tabChangedWithKey, setTabChangedWithKey] = useState(false);

  useAutoFocus(ref, autoFocus || tabChangedWithKey);

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft') {
      event.stopPropagation(); // prevent other navigation
      const prevTabIndex = (selectedTabIndex + tabs.length - 1) % tabs.length;

      setTabChangedWithKey(true);
      onSelect(tabs[prevTabIndex].key);
    } else if (event.key === 'ArrowRight') {
      event.stopPropagation(); // prevent other navigation
      const nextTabIndex = (selectedTabIndex + 1) % tabs.length;

      setTabChangedWithKey(true);
      onSelect(tabs[nextTabIndex].key);
    }
  };

  return (
    <div className={cssClasses} style={style}>
      <ul
        className={sc('list')}
        role="tablist"
        aria-label="Use left and right arrow keys to navigate."
      >
        {
          tabs.map((tab) => (
            <li
              className={classNames(sc('tab'), selected === tab.key && sc('tab--active'))}
              key={tab.key}
            >
              <button
                aria-selected={selected === tab.key}
                onClick={() => onSelect(tab.key)}
                onKeyUp={handleKeyUp}
                ref={selected === tab.key ? ref : undefined}
                role="tab"
                tabIndex={selected === tab.key ? tabIndex : -1}
                type="button"
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
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabIndex: PropTypes.number,
};

Tabs.defaultProps = {
  autoFocus: false,
  className: '',
  style: undefined,
  tabIndex: -1,
};
