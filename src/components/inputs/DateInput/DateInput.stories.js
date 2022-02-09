import React from 'react';
import DateInput from './DateInput';

export default {
  title: 'Inputs/Date Input',
  component: DateInput,
};

const Template = (args) => <DateInput {...args} style={{height: '100%', width: '100%'}} />;

export const Date = Template.bind({});
Date.args = {
  onChange: (value) => console.log(value),
};
