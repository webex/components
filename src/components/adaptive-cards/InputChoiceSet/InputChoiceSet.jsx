import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {Dropdown, CheckboxSet, RadioSet} from '../../inputs';
import {formatDateTime} from '../util';
import {uniqueId} from '../../../util';

/**
 * Adaptive Cards InputChoiceSet component
 * https://adaptivecards.io/explorer/Input.ChoiceSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.id]  DOM id
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function InputChoiceSet({
  data, className, id: domId, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-choice-set', className);
  const {
    setValue, getValue, setInput, getError,
  } = useContext(AdaptiveCardContext);
  const value = getValue(data.id);
  const values = value ? Object.fromEntries(String(value).split(',').map((v) => [v, true])) : {};
  const id = domId || uniqueId();
  let comp;

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

  const onSingleChange = (val) => {
    setValue(data.id, val);
  };

  const onMultiChange = (val, isSelected) => {
    values[val] = isSelected;
    setValue(data.id, data.choices.map((choice) => (values[choice.value] ? choice.value : undefined)).filter((v) => v !== undefined).join(','));
  };

  if (data.isMultiSelect === false && String(data.style).toLowerCase() === 'compact') {
    comp = (
      <Dropdown
        className={cssClasses}
        error={getError(data.id)}
        id={id}
        label={formatDateTime(data.label)}
        onChange={(option) => onSingleChange(option)}
        options={data.choices.map((choice) => ({label: choice.title, value: choice.value}))}
        placeholder={data.placeholder}
        required={data.isRequired}
        value={value}
      />
    );
  } else if (data.isMultiSelect === true || data.choices.length === 1) {
    comp = (
      <CheckboxSet
        className={cssClasses}
        error={getError(data.id)}
        id={id}
        label={formatDateTime(data.label)}
        onChange={onMultiChange}
        options={data.choices.map((choice) => ({label: choice.title, value: choice.value}))}
        required={data.isRequired}
        selected={values}
        style={style}
      />
    );
  } else {
    comp = (
      <RadioSet
        className={cssClasses}
        error={getError(data.id)}
        id={id}
        label={formatDateTime(data.label)}
        onChange={onSingleChange}
        options={data.choices.map((choice) => ({label: choice.title, value: choice.value}))}
        required={data.isRequired}
        selected={value}
        style={style}
      />
    );
  }

  return comp;
}

InputChoiceSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.shape(),
};

InputChoiceSet.defaultProps = {
  className: '',
  id: undefined,
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
