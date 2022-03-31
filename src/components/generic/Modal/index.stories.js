import React from 'react';
import Modal from './Modal';

export default {
  title: 'Generic/Modal',
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
};
