import React from 'react';
import {DestinationType} from '@webex/component-adapter-interfaces';
import WebexMemberRoster from './WebexMemberRoster';
import Memberships from '../../data/memberships';

const destinationIDs = Object.values(Memberships).map((membership) => membership.destinationID);

export default {
  title: 'Platform/Webex Member Roster',
  component: WebexMemberRoster,
  argTypes: {
    destinationID: {
      control: {
        type: 'select',
        options: destinationIDs,
      },
    },
    destinationType: {
      control: {
        type: 'select',
        options: Object.values(DestinationType),
      },
    },
  },
};

const Template = (args) => <WebexMemberRoster {...args} />;

export const Space = Template.bind({});
Space.args = {
  destinationID: 'room1',
  destinationType: 'room',
};
