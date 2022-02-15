import React from 'react';
import AdaptiveCard from '../AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard/Inputs',
  component: AdaptiveCard,
};

const Template = (args) => (
  <AdaptiveCard
    {...args}
    onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)}
    onInvalidSubmit={(inputs) => alert(`Submitted invalid values:\n${JSON.stringify(inputs, null, 4)}`)}
  />
);

const exampleInputChoiceSet = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.ChoiceSet',
      id: 'input1',
      style: 'compact',
      isMultiSelect: false,
      label: 'Default Input.ChoiceSet label (compact)',
      placeholder: 'Please make a selection',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input2',
      style: 'compact',
      isMultiSelect: false,
      label: 'Required Input.ChoiceSet label (compact)',
      isRequired: true,
      errorMessage: 'Required input',
      placeholder: 'Please make a selection',
      value: '1',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input3',
      style: 'expanded',
      isMultiSelect: false,
      label: 'Default Input.ChoiceSet label (expanded)',
      value: '2',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input4',
      style: 'expanded',
      isMultiSelect: false,
      label: 'Required Input.ChoiceSet label (expanded)',
      isRequired: true,
      errorMessage: 'Required input',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input5',
      style: 'expanded',
      isMultiSelect: true,
      label: 'Default Input.ChoiceSet label (expanded, multiselect)',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input6',
      style: 'compact',
      isMultiSelect: true,
      isRequired: true,
      value: '1,3',
      label: 'Required Input.ChoiceSet label (compact, multiselect)',
      errorMessage: 'Required input',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
        {
          title: 'Option 3',
          value: '3',
        },
      ],
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputDate = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'Date Input',
    },
    {
      type: 'Input.Date',
      id: 'date',
      placeholder: 'Enter a date',
      value: '2017-10-12',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputNumber = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.Number',
      id: 'number',
      placeholder: 'Enter a number',
      label: 'Test',
      min: 1,
      max: 10,
      value: 3,
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputText = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'Specify the type of text being requested:',
      style: 'heading',
    },
    {
      type: 'Input.Text',
      id: 'myComment',
      style: 'text',
      height: 'auto',
      isRequired: true,
      errorMessage: 'This is a required input',
    },
    {
      type: 'Input.Text',
      id: 'myEmail',
      label: 'style: email',
      style: 'email',
      errorMessage: 'This is a required input',
    },
    {
      type: 'Input.Text',
      id: 'myTel',
      label: 'style: tel',
      style: 'tel',
      height: 'stretch',
    },
    {
      type: 'Input.Text',
      id: 'myUrl',
      label: 'style: url',
      style: 'url',
    },
    {
      type: 'Input.Text',
      id: 'myPassword',
      label: 'style: password',
      style: 'password',
    },
    {
      type: 'TextBlock',
      text: 'Multiline text input:',
    },
    {
      type: 'Input.Text',
      id: 'multilineInputId',
      placeholder: 'enter comment',
      maxLength: 500,
      isMultiline: true,
    },
    {
      type: 'TextBlock',
      text: 'Pre-filled value:',
    },
    {
      type: 'Input.Text',
      id: 'prefilledInputId',
      placeholder: 'enter comment',
      maxLength: 500,
      isMultiline: true,
      value: 'This value was pre-filled',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputTime = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.Time',
      id: 'timeValueSet',
      label: 'Start time',
      min: '10:00',
      max: '18:00',
      value: '12:43',
    },
    {
      type: 'Input.Time',
      id: 'timeValueUnset',
      label: 'End time',
      isRequired: true,
      errorMessage: 'This input is required',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputToggle = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.Toggle',
      id: 'acceptTerms',
      title: 'I accept the terms and agreements',
      value: 'rejected',
      valueOn: 'accepted',
      valueOff: 'rejected',
      label: 'Please check the box below to accept the terms and agreements:',
      isRequired: true,
      errorMessage: 'You must accept the terms to continue.',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

export const InputChoiceSet = Template.bind({});
InputChoiceSet.args = {
  template: exampleInputChoiceSet,
};

export const InputDate = Template.bind({});
InputDate.args = {
  template: exampleInputDate,
};

export const InputNumber = Template.bind({});
InputNumber.args = {
  template: exampleInputNumber,
};

export const InputText = Template.bind({});
InputText.args = {
  template: exampleInputText,
};

export const InputTime = Template.bind({});
InputTime.args = {
  template: exampleInputTime,
};

export const InputToggle = Template.bind({});
InputToggle.args = {
  template: exampleInputToggle,
};
