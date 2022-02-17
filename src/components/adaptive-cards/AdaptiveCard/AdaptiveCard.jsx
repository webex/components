import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Template} from 'adaptivecards-templating';
import webexComponentClasses from '../../helpers';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {mapValues} from '../../../util';
import {formatDateTime} from '../util';
import Markdown from '../Markdown/Markdown';

import Component, {acPropTypes, registerComponent} from '../Component/Component';
import '../ActionOpenURL/ActionOpenUrl';
import '../ActionSet/ActionSet';
import '../ActionShowCard/ActionShowCard';
import '../ActionSubmit/ActionSubmit';
import '../ActionToggleVisibility/ActionToggleVisibility';
import '../Column/Column';
import '../ColumnSet/ColumnSet';
import '../Container/Container';
import '../FactSet/FactSet';
import '../Image/Image';
import '../ImageSet/ImageSet';
import '../InputChoiceSet/InputChoiceSet';
import '../InputDate/InputDate';
import '../InputNumber/InputNumber';
import '../InputText/InputText';
import '../InputTime/InputTime';
import '../InputToggle/InputToggle';
import '../RichTextBlock/RichTextBlock';
import '../TextBlock/TextBlock';
import '../TextRun/TextRun';

/**
 * AdaptiveCardInternal component
 *
 * @param {object} props  React properties
 * @param {object} props.data  Active Cards definition
 * @param {object} [props.action]  A set of attributes to apply when the component behaves as an action
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
function AdaptiveCardInternal({
  action, data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-card', [className, 'wxc-ac-container--has-padding']);
  let showFallbackText = false;

  if (data.$schema && data.$schema !== 'http://adaptivecards.io/schemas/adaptive-card.json') {
    console.warn('Unknown AdaptiveCard schema:', data.$schema);
  }

  if (data.version) {
    const version = parseFloat(data.version);

    if (!version) {
      console.warn(`Invalid version ${data.version}`);
    } else if (version > 1.2) {
      console.warn(`Adaptive card requires version ${data.version}, this renderer only supports version 1.2`);
      showFallbackText = true;
    }
  }

  return (
    <div className={cssClasses} {...action} style={style}>
      {showFallbackText && <Markdown>{formatDateTime(data.fallbackText)}</Markdown>}
      {data.body?.map((item, index) => <Component data={item} inherited={inherited} key={index} />)}
      {data.actions && <Component data={{type: 'ActionSet', actions: data.actions}} inherited={inherited} />}
    </div>
  );
}

AdaptiveCardInternal.propTypes = {
  action: PropTypes.shape(),
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

AdaptiveCardInternal.defaultProps = {
  action: undefined,
  className: undefined,
  style: undefined,
};

AdaptiveCardInternal.acPropTypes = {
  actions: acPropTypes.actions,
  backgroundImage: acPropTypes.backgroundImage,
  body: acPropTypes.children,
  minHeight: acPropTypes.minHeight,
  rtl: acPropTypes.rtl,
  $schema: acPropTypes.$schema,
  selectAction: acPropTypes.selectAction,
  type: acPropTypes.type,
  version: acPropTypes.version,
  verticalContentAlignment: acPropTypes.verticalContentAlignment,
};

registerComponent('AdaptiveCard', AdaptiveCardInternal, 'vertical');

/**
 * AdaptiveCard component
 *
 * @param {object} props  React properties
 * @param {object} props.template  Adaptive Card template
 * @param {object} [props.context]  Provided data for binding to Adaptive Card
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @param {Function} [props.onSubmit]  Action to perform on submit
 * @param {Function} [props.onInvalidSubmit]  Action to perform on invalid submit
 * @returns {object} JSX of the component
 */
export default function AdaptiveCard({
  template,
  context,
  className,
  style,
  onSubmit,
  onInvalidSubmit,
}) {
  const templateInstance = new Template(template);
  const data = templateInstance.expand({
    $root: context,
  });
  const inherited = {};

  if (!data.version) {
    console.warn('AdaptiveCard missing version property');
  }

  const [inputs, setInputs] = useState({});
  const [elements, setElements] = useState({});

  const setElement = useCallback((element) => {
    setElements((prevElements) => (
      {...prevElements, [element.id]: element}
    ));
  }, [setElements]);

  const setIsVisible = (id, isVisible) => {
    setElements((prevElements) => {
      const targetElem = prevElements[id];

      return {
        ...prevElements,
        [id]: {...targetElem, isVisible},
      };
    });
  };

  const getIsVisible = (id) => (elements[id]?.isVisible !== false);

  const setValue = (id, value) => {
    setInputs((prevInputs) => {
      const input = prevInputs[id];

      return {
        ...prevInputs,
        [id]: {...input, value, error: undefined},
      };
    });
  };

  const setInput = useCallback((input) => {
    setInputs((prevInputs) => ({...prevInputs, [input.id]: input}));
  }, [setInputs]);

  const getValue = (id, defval = '') => ((id in inputs && inputs[id].value !== undefined) ? inputs[id].value : defval);

  const getAllValues = () => mapValues(inputs, (input) => (input.value));

  const getError = (id) => inputs[id]?.error;

  /**
   * Validates input values, returns true if all are valid, false if any is invalid
   *
   * @returns {boolean} True if all values are valid
   */
  const validate = () => {
    const newInputs = mapValues(inputs, (input) => {
      let error;

      if (input.isRequired && !input.value && input.value !== 0) {
        error = input.errorMessage || 'This field is required';
      } else if (input.min > input.max && input.value < input.min && input.value > input.max) {
        error = `Value must be between ${input.min} and ${input.max}`;
      } else if ((input.min < input.max || input.max === undefined) && input.value < input.min) {
        error = `Minimum value is ${input.min}`;
      } else if ((input.min < input.max || input.min === undefined) && input.value > input.max) {
        error = `Maximum value is ${input.max}`;
      } else if (input.regex && !String(input.value).match(input.regex)) {
        error = input.errorMessage || `The value you entered must match the pattern ${input.regex}`;
      } else if (String(input.value).length > input.maxLength) {
        error = `Maximum length is ${input.maxLength}`;
      }

      return {...input, error};
    });

    setInputs(newInputs);

    return Object.values(newInputs).every((input) => !input.error);
  };

  const submit = (values) => onSubmit(values);
  const invalidSubmit = (values) => onInvalidSubmit && onInvalidSubmit(values);

  return (
    <AdaptiveCardContext.Provider
      value={{
        setValue,
        getValue,
        getAllValues,
        setInput,
        getError,
        validate,
        submit,
        invalidSubmit,
        setElement,
        setIsVisible,
        getIsVisible,
      }}
    >
      <Component data={data} className={className} inherited={inherited} style={style} />
    </AdaptiveCardContext.Provider>
  );
}

AdaptiveCard.propTypes = {
  template: PropTypes.shape().isRequired,
  context: PropTypes.shape(),
  className: PropTypes.string,
  style: PropTypes.shape(),
  onSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
};

AdaptiveCard.defaultProps = {
  className: undefined,
  context: undefined,
  style: undefined,
  onSubmit: undefined,
  onInvalidSubmit: undefined,
};
