import React from 'react';
import {PersonStatus} from '@webex/component-adapter-interfaces';
import people from '../../data/people';
import WebexAvatar from './WebexAvatar';

export default {
  title: 'Platform/Webex Avatar',
  component: WebexAvatar,
};

const Template = (args) => <WebexAvatar {...args} />;

export const NoStatus = Template.bind({});
NoStatus.args = {
  personID: 'user1',
  displayStatus: false,
};

export const Active = Template.bind({});
Active.args = {
  personID: 'user1',
};
Active.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.ACTIVE,
      },
    },
  },
};

export const Call = Template.bind({});
Call.args = {
  personID: 'user1',
};
Call.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.CALL,
      },
    },
  },
};

export const Bot = Template.bind({});
Bot.args = {
  personID: 'user1',
};
Bot.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.BOT,
      },
    },
  },
};

export const DoNotDisturb = Template.bind({});
DoNotDisturb.args = {
  personID: 'user1',
};
DoNotDisturb.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.DO_NOT_DISTURB,
      },
    },
  },
};

export const Inactive = Template.bind({});
Inactive.args = {
  personID: 'user1',
};
Inactive.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.INACTIVE,
      },
    },
  },
};

export const Meeting = Template.bind({});
Meeting.args = {
  personID: 'user1',
};
Meeting.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.MEETING,
      },
    },
  },
};

export const OutOfOffice = Template.bind({});
OutOfOffice.args = {
  personID: 'user1',
};
OutOfOffice.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.OUT_OF_OFFICE,
      },
    },
  },
};

export const Presenting = Template.bind({});
Presenting.args = {
  personID: 'user1',
};
Presenting.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.PRESENTING,
      },
    },
  },
};

export const Self = Template.bind({});
Self.args = {
  personID: 'user1',
};
Self.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.SELF,
      },
    },
  },
};

export const Typing = Template.bind({});
Typing.args = {
  personID: 'user1',
};
Typing.parameters = {
  mockData: {
    people: {
      user1: {
        ...people.user1,
        status: PersonStatus.TYPING,
      },
    },
  },
};

export const Invalid = Template.bind({});
Invalid.args = {
  personID: 'user-7',
};
