import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

/**
 * Input Field component.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @param {string} props.type  Input type
 * @param {string} props.name  Input name
 * @param {string} props.value  Input value
 * @param {string} props.placeholder  Input placeholder
 * @param {Function} props.onChange  Action to perform on input change
 * @param {boolean} props.disabled  Flag indicating input disabled
 * @param {string} props.error  Error text
 * @param {string} props.ariaLabel  Hint to be displayed as aria-label
 * @param {boolean} props.required  Flag indicating input required
 * @returns {object} JSX of the component
 */
export default function InputField({
  className,
  style,
  type,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  error,
  ariaLabel,
  required,
}) {
  const [cssClasses, sc] = webexComponentClasses('input-field', className, {error});
  const [isPwdRevealed, setIsPwdRevealed] = useState(false);

  const handleChange = (event) => onChange(event.target.value);
  const clearInput = () => onChange('');

  const toggleIsPwdRevealed = () => {
    setIsPwdRevealed((revealed) => !revealed);
  };

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('form-control')}>
        <input
          type={isPwdRevealed ? 'text' : type}
          value={value}
          name={name}
          className={sc('input')}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel}
          required={required}
        />
        {type === 'password' && value && (
          <Button type="ghost" className={sc('input-field-right-icon')} size={28} onClick={toggleIsPwdRevealed}>
            <Icon name={isPwdRevealed ? 'hide-password' : 'show-password'} />
          </Button>
        )}
        {type !== 'password' && value && (
          <Button type="ghost" className={sc('input-field-right-icon')} size={28} onClick={clearInput}>
            <Icon name="cancel" size={16} />
          </Button>
        )}
      </div>
      {
        error
        && (
          <div className={sc('input-error-container')}>
            <Icon name="warning" size={16} className={sc('input-error-icon')} />
            <span className={sc('input-error-text')}>{error}</span>
          </div>
        )
      }
    </div>
  );
}

InputField.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  ariaLabel: PropTypes.string,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  className: '',
  style: undefined,
  type: 'text',
  value: '',
  name: '',
  placeholder: '',
  onChange: undefined,
  disabled: false,
  error: undefined,
  ariaLabel: undefined,
  required: false,
};
