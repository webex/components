import React from 'react';
import TimeInput from './TimeInput';

export default {
  title: 'Inputs/Time Input',
  component: TimeInput,
};

const Template = (args) => <TimeInput {...args} />;

export const Time = Template.bind({});
Time.args = {
  onChange: (value) => console.log(value),
};
