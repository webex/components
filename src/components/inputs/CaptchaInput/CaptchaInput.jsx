import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {Button, Icon, InputField} from '../../generic';

export default function CaptchaInput({
    ariaLabel,
    autoFocus,
    className,
    error,
    label,
    maxLength,
    name,
    onChange,
    pattern,
    placeholder,
    required,
    style,
    tabIndex,
    value,
}) {
    
    const [cssClasses] = webexComponentClasses('captcha-input', className);
    
    return (
        <InputField
            ariaLabel={ariaLabel}
            autoFocus={autoFocus}
            className={cssClasses}
            error={error}
            label={label}
            maxLength={maxLength}
            name={name}
            onChange={onChange}
            pattern={pattern}
            placeholder={placeholder}
            required={required}
            rightIcon={value ? showCaptcha : false}
            style={style}
            tabIndex={tabIndex}
            value={value}
        />
    );
}

CaptchaInput.propTypes = {
    ariaLabel: PropTypes.string,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.shape(),
    tabIndex: PropTypes.number,
    value: PropTypes.string,
};
  
CaptchaInput.defaultProps = {
    ariaLabel: undefined,
    autoFocus: false,
    className: undefined,
    error: undefined,
    label: undefined,
    maxLength: undefined,
    name: undefined,
    pattern: undefined,
    placeholder: undefined,
    required: false,
    style: undefined,
    tabIndex: 0,
    value: undefined,
};
  

