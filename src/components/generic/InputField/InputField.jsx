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
 * @returns {object} JSX of the component
 */
export default function InputField({
  className,
  style,
  type,
  value,
  name,
  placeholder,
  onChange,
  disabled,
}) {
  const cssClasses = webexComponentClasses('input-field', className);
  const [isPwdRevealed, setIsPwdRevealed] = useState(false);

  const toggleIsPwdRevealed = () => {
    setIsPwdRevealed((revealed) => !revealed);
  };

  return (
    <div className={cssClasses} style={style}>
      <input
        type={isPwdRevealed ? 'text' : type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {type === 'password' && value && (
        <Button type="ghost" className="input-field-right-icon" onClick={toggleIsPwdRevealed}>
          <Icon name={isPwdRevealed ? 'hide-password' : 'show-password'} />
        </Button>
      )}
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
};
