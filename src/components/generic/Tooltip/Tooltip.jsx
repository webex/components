import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Portal from '../Portal/Portal';

/**
 * Displays tooltip
 *
 * @param {object} props  Data passed to the component
 * @param {React.ReactNode[]} props.children  List of children
 * @param {string} [props.className]  Additional className for the component
 * @param {string} props.style  Inline style for the component
 * @param {object} props.target  Ref for the target element
 * @returns {object} JSX of the element
 */
const Tooltip = ({
  children,
  className,
  style,
  target,
}) => {
  const [cssClasses] = webexComponentClasses('tooltip-container', className);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  let coords;

  if (target) {
    const rect = target.getBoundingClientRect();

    coords = {
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      bottom: window.innerHeight - rect.bottom + rect.height + 5 - window.scrollY, // offset from bottom - any Y scroll
    };
  }

  useEffect(() => {
    let cleanup;

    if (target) {
      const handleMouseEnter = () => {
        setTooltipVisible(true);
      };
      const handleMouseLeave = () => {
        setTooltipVisible(false);
      };

      target.addEventListener('mouseenter', handleMouseEnter);
      target.addEventListener('mouseleave', handleMouseLeave);

      cleanup = () => {
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    return cleanup;
  }, [coords, target]);

  return (
    tooltipVisible && (
      <Portal>
        <div className={cssClasses} style={{...style, ...coords}}>
          <div className="tooltip-wrapper">
            <div className="tooltip-box">
              {children}
              <span className="tooltip-arrow" />
            </div>
          </div>
        </div>
      </Portal>
    )
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
  target: PropTypes.shape(),
};

Tooltip.defaultProps = {
  className: '',
  style: {},
  target: null,
};

export default Tooltip;
