import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Icon from '../../generic/Icon/Icon';

/**
 * Label wraps a form input and displays label text and error message
 *
 * @param {object} props  React props passed to the component
 * @param {React.ReactNode[]}  props.children  List of children
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.error]  Error text
 * @param {string} props.id  Label id
 * @param {string} [props.label]  Label text
 * @param {boolean} [props.required=false]  Flag indicating whether the control is required
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Label({
  children,
  className,
  error,
  id,
  label,
  required,
  style,
}) {
  const [cssClasses, sc] = webexComponentClasses('label', className);

  return (
    <div className={cssClasses} style={style}>
      {
        label && (
          // disabling label-has-associated-control as eslint does not see role attribute as a nested control
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className={sc('label-text')} htmlFor={`${id}-control`} id={`${id}-label`}>
            <span className={sc('text')}>{label}</span>
            {required && <span className={sc('required')}> *</span>}
          </label>
        )
      }
      <div className={sc('control')}>{children}</div>
      {
        error
        && (
          <div className={sc('error')} id={`${id}-error`}>
            <Icon name="warning" size={16} className={sc('error-icon')} />
            <span className={sc('error-text')}>{error}</span>
          </div>
        )
      }
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape(),
};

Label.defaultProps = {
  className: undefined,
  error: undefined,
  label: undefined,
  required: false,
  style: undefined,
};
