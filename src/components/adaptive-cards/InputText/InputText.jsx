import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {acPropTypes, registerComponent} from '../Component/Component';
import {TextInput, PasswordInput} from '../../inputs';
import Textbox from '../../inputs/Textbox/Textbox';
import ActionSet from '../ActionSet/ActionSet';
import {formatDateTime} from '../util';
import useAction from '../hooks/useAction';

/**
 * Adaptive Cards Input.Text component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputText({data, className, style}) {
  const {
    setValue,
    getValue,
    setInput,
    getError,
  } = useContext(AdaptiveCardContext);
  const [cssClasses, sc] = webexComponentClasses('adaptive-cards-input-text', className);
  const Input = data.style === 'password' ? PasswordInput : TextInput;
  const inlineAction = useAction(data.inlineAction);

  useEffect(() => {
    setInput({
      id: data.id,
      value: data.value,
      isRequired: data.isRequired,
      errorMessage: data.errorMessage,
      maxLength: data.maxLength,
      regex: data.regex,
    });
  }, [
    data.id,
    data.value,
    data.isRequired,
    data.errorMessage,
    data.maxLength,
    data.regex,
    setInput,
  ]);

  return (
    <div className={cssClasses} style={style}>
      {!data.isMultiline ? (
        <Input
          className={sc('input')}
          error={getError(data.id)}
          label={formatDateTime(data.label)}
          maxLength={data.maxLength}
          onChange={(value) => setValue(data.id, value)}
          pattern={data.regex}
          placeholder={data.placeholder}
          required={data.isRequired}
          type={data.style}
          value={getValue(data.id)}
        />
      ) : (
        <Textbox
          className={sc('textbox')}
          error={getError(data.id)}
          label={formatDateTime(data.label)}
          maxLength={data.maxLength}
          onChange={(value) => setValue(data.id, value)}
          placeholder={data.placeholder}
          required={data.isRequired}
          value={getValue(data.id)}
        />
      )}
      {inlineAction && <ActionSet className={sc('inline-action')} data={{actions: [data.inlineAction]}} inherited={{}} />}
    </div>
  );
}

InputText.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

InputText.defaultProps = {
  className: undefined,
  style: undefined,
};

InputText.acPropTypes = {
  errorMessage: acPropTypes.errorMessage,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  inlineAction: acPropTypes.inlineAction,
  isMultiline: acPropTypes.isMultiline,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  maxLength: acPropTypes.maxLength,
  placeholder: acPropTypes.placeholder,
  regex: acPropTypes.regex,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.inputStyle,
  type: acPropTypes.type,
  value: acPropTypes.value,
};

InputText.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Text', InputText);
