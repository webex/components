import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {Dropdown} from '../../inputs';
import Checkbox from '../../inputs/Checkbox/Checkbox';
import Label from '../../inputs/Label/Label';
import RadioButton from '../../inputs/RadioButton/RadioButton';
import {formatDateTime} from '../util';

/**
 * Adaptive Cards InputChoiceSet component
 * https://adaptivecards.io/explorer/Input.ChoiceSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function InputChoiceSet({
  data, className, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-choice-set', className);
  const {
    setValue, getValue, setInput, getError,
  } = useContext(AdaptiveCardContext);
  const value = getValue(data.id);
  const values = value ? Object.fromEntries(String(value).split(',').map((v) => [v, true])) : {};
  let input;

  const onSingleChange = (val) => {
    setValue(data.id, val);
  };

  const onMultiChange = (val, isSelected) => {
    values[val] = isSelected;
    setValue(data.id, data.choices.map((choice) => (values[choice.value] ? choice.value : undefined)).filter((v) => v !== undefined).join(','));
  };

  if (data.isMultiSelect === true || data.choices.length === 1) {
    input = data.choices.map((choice, index) => (
      <Checkbox
        key={index}
        onChange={(isSelected) => onMultiChange(choice.value, isSelected)}
        selected={values[choice.value]}
        title={choice.title}
      />
    ));
  } else if (String(data.style).toLowerCase() === 'compact') {
    input = (
      <Dropdown
        onChange={(option) => onSingleChange(option)}
        options={data.choices.map((choice) => ({label: choice.title, value: choice.value}))}
        placeholder={data.placeholder}
        value={value}
      />
    );
  } else {
    input = data.choices.map((choice, index) => (
      <RadioButton
        key={index}
        onChange={() => onSingleChange(choice.value)}
        selected={choice.value === value}
        title={choice.title}
      />
    ));
  }

  useEffect(() => {
    setInput({
      id: data.id,
      value: data.value,
      isRequired: data.isRequired,
      errorMessage: data.errorMessage,
    });
  }, [
    data.id,
    data.value,
    data.isRequired,
    data.errorMessage,
    setInput,
  ]);

  return (
    <Label
      className={cssClasses}
      error={getError(data.id)}
      label={formatDateTime(data.label)}
      required={data.isRequired}
      style={style}
    >
      {input}
    </Label>
  );
}

InputChoiceSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputChoiceSet.defaultProps = {
  className: '',
  style: undefined,
};

InputChoiceSet.acPropTypes = {
  choices: acPropTypes.children,
  errorMessage: acPropTypes.errorMessage,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isMultiSelect: acPropTypes.isMultiSelect,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  placeholder: acPropTypes.placeholder,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.style,
  type: acPropTypes.type,
  value: acPropTypes.value,
  wrap: acPropTypes.wrap,
};

InputChoiceSet.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.ChoiceSet', InputChoiceSet, 'vertical');
