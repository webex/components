import React from 'react';
import DateInput from './DateInput';

export default {
  title: 'Inputs/Date Input',
  component: DateInput,
};

const Template = (args) => <DateInput {...args} />;

export const Date = Template.bind({});
Date.args = {
  onChange: (value) => console.log(value),
};
