import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {useElementPosition, useRef} from '../../hooks';

/**
 * Popup component - wrapper component that decides based on the available space
 * where to be rendered - above or under the target element
 *
 * @param {object} props Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @param {React.ReactNode[]} props.children  List of children
 * @returns {object}  JSX of the element
 */
export default function Popup({className, style, children}) {
  const [cssClasses] = webexComponentClasses('popup', className);
  const [position, setPosition] = useState(null);
  const ref = useRef();
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    parentRef(ref.current?.parentNode);
    childRef(ref.current?.firstChild);
    // Disable "unnecessary dependency" warning because our custom ref is a valid dependency (it triggers a re-render on change)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ref.current]);

  const parentPosition = useElementPosition(parentRef);
  const childPosition = useElementPosition(childRef);

  useEffect(() => {
    let newPosition;

    const spaceAbove = parentPosition?.top || 0;
    const spaceBelow = window.innerHeight - (parentPosition?.bottom || 0) - window.scrollY - 12;

    if (!parentPosition || !childPosition) {
      newPosition = {};
    } else if (
      childPosition.height <= spaceBelow ||
      spaceBelow >= spaceAbove
    ) {
      // show popup below target
      newPosition = {
        top: parentPosition.bottom + 4,
        maxHeight: spaceBelow,
        width: parentPosition.width,
      };
    } else {
      // show popup above target
      newPosition = {
        bottom: window.innerHeight - spaceAbove - window.scrollY + 4,
        maxHeight: spaceAbove - 12,
        width: parentPosition.width,
      };
    }

    setPosition(newPosition);
  }, [setPosition, parentPosition, childPosition]);

  return (
    <div className={cssClasses} style={{...style, ...position}} ref={ref}>
      <div>{children}</div>
    </div>
  );
}

Popup.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  className: undefined,
  style: undefined,
};
