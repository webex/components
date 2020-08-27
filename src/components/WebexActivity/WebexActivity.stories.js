import React from 'react';
import {addDays, getDay, subDays} from 'date-fns';
import activities from '../../data/activities.json';
import WebexActivity from './WebexActivity';

export default {
  title: 'Messaging/Webex Activity',
  component: WebexActivity,
};

const Template = (args) => <WebexActivity {...args} />;

export const Default = Template.bind({});
Default.args = {
  activityID: 'default',
};

export const NoHeader = Template.bind({});
NoHeader.args = {
  activityID: 'no-header',
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  activityID: 'multi-line',
};

export const CreatedToday = Template.bind({});
CreatedToday.args = {
  activityID: 'default',
};
CreatedToday.parameters = {
  jsonData: {
    activities: {
      default: {
        ...activities.default,
        created: new Date().toString(),
      },
    },
  },
};

export const CreatedYesterday = Template.bind({});
CreatedYesterday.args = {
  activityID: 'default',
};
CreatedYesterday.parameters = {
  jsonData: {
    activities: {
      default: {
        ...activities.default,
        created: subDays(new Date(), 1).toString(),
      },
    },
  },
};

export const CreatedThisWeek = Template.bind({});
CreatedThisWeek.args = {
  activityID: 'default',
};
CreatedThisWeek.parameters = {
  jsonData: {
    activities: {
      default: {
        ...activities.default,
        // If it's Sunday, make it a Monday, otherwise pick the day before today
        created: getDay(new Date()) === 0
          ? addDays(new Date(), 1)
          : subDays(new Date(), 2).toString(),
      },
    },
  },
};

export const CreatedLongBack = Template.bind({});
CreatedLongBack.args = {
  activityID: 'default',
};
CreatedLongBack.parameters = {
  jsonData: {
    activities: {
      default: {
        ...activities.default,
        created: subDays(new Date(), 7).toString(),
      },
    },
  },
};
