import React from 'react';
import {PersonStatus} from '@webex/component-adapter-interfaces';
import people from '../../data/people.json';
import WebexAvatar from './WebexAvatar';

export default {
  title: 'Platform/Webex Avatar',
  component: WebexAvatar,
};

const Template = (args) => <WebexAvatar {...args} />;

export const NoStatus = Template.bind({});
NoStatus.args = {
  personID: 'default',
  displayStatus: false,
};

export const Active = Template.bind({});
Active.args = {
  personID: 'default',
};
Active.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.ACTIVE,
      },
    },
  },
};

export const Call = Template.bind({});
Call.args = {
  personID: 'default',
};
Call.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.CALL,
      },
    },
  },
};

export const Bot = Template.bind({});
Bot.args = {
  personID: 'default',
};
Bot.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.BOT,
      },
    },
  },
};

export const DoNotDisturb = Template.bind({});
DoNotDisturb.args = {
  personID: 'default',
};
DoNotDisturb.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.DO_NOT_DISTURB,
      },
    },
  },
};

export const Inactive = Template.bind({});
Inactive.args = {
  personID: 'default',
};
Inactive.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.INACTIVE,
      },
    },
  },
};

export const Meeting = Template.bind({});
Meeting.args = {
  personID: 'default',
};
Meeting.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.MEETING,
      },
    },
  },
};

export const OutOfOffice = Template.bind({});
OutOfOffice.args = {
  personID: 'default',
};
OutOfOffice.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.OUT_OF_OFFICE,
      },
    },
  },
};

export const Presenting = Template.bind({});
Presenting.args = {
  personID: 'default',
};
Presenting.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.PRESENTING,
      },
    },
  },
};

export const Self = Template.bind({});
Self.args = {
  personID: 'default',
};
Self.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.SELF,
      },
    },
  },
};

export const Typing = Template.bind({});
Typing.args = {
  personID: 'default',
};
Typing.parameters = {
  jsonData: {
    people: {
      default: {
        ...people.default,
        status: PersonStatus.TYPING,
      },
    },
  },
};

export const Invalid = Template.bind({});
Invalid.args = {
  personID: '123',
};
