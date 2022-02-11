import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Icon from '../../generic/Icon/Icon';

/**
 * Label wraps a form input and displays label text and error message
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @param {React.ReactNode[]}  props.children  List of children
 * @param {string} [props.label]  Label text
 * @param {string} [props.error]  Error text
 * @param {boolean} [props.required=false]  Flag indicating whether the control is required
 * @returns {object} JSX of the component
 */
export default function Label({
  className,
  style,
  children,
  label,
  error,
  required,
}) {
  const [cssClasses, sc] = webexComponentClasses('label', className);

  return (
    // disabling label-has-associated-control as eslint does not see role attribute as a nested control
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cssClasses} style={style}>
      {
        label && (
          <div className={sc('label-text')}>
            {label}
            {required && <span className={sc('required')}> *</span>}
          </div>
        )
      }
      <div className={sc('control')}>{children}</div>
      {
        error
        && (
          <div className={sc('error')}>
            <Icon name="warning" size={16} className={sc('error-icon')} />
            <span className={sc('error-text')}>{error}</span>
          </div>
        )
      }
    </label>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};

Label.defaultProps = {
  className: undefined,
  style: undefined,
  label: undefined,
  error: undefined,
  required: false,
};
