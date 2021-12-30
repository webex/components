import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Spacer helper component
 *
 * @param {object} props  React props passed to the component
 * @param {string} props.spacing  The type of spacing
 * @param {boolean} props.separator  Whether or not to display the separator
 * @param {object} props.containerType  The type of the parent container
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Spacer({
  className,
  separator,
  spacing,
  style,
}) {
  const spacingClassName = `spacing--${String(spacing).toLowerCase()}`;

  const [cssClasses] = webexComponentClasses('ac-spacer', className, {
    [spacingClassName]: !!spacing,
  });

  return (
    <div className={cssClasses} style={{style}}>
      {separator && <div />}
    </div>
  );
}

Spacer.propTypes = {
  className: PropTypes.string,
  separator: PropTypes.bool,
  spacing: PropTypes.string,
  style: PropTypes.shape(),
};

Spacer.defaultProps = {
  className: '',
  separator: false,
  spacing: 'default',
  style: undefined,
};
