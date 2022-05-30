import React from 'react';
import WebexCreateSpace from './WebexCreateSpace';
import People from '../../data/people';

export default {
  title: 'Platform/Webex Create Space',
  component: WebexCreateSpace,
};

const Template = (args) => <WebexCreateSpace {...args} />;

export const createSpace = Template.bind({});

createSpace.args = {
  createSpace: true,
  spaceName: 'test-widgets',
  createSpaceResponse: (err, data) => console.log(err, data),
  webexLookAhead: true,
  memberLookAhead: async (query) => {
    let result;

    const collabList = () => new Promise((resolve, reject) => setTimeout(() => {
      result = People[`${query}Collab`];
      if (result) {
        resolve(result);
      } else {
        reject();
      }
    }, 500));

    if (query) {
      const collabListResp = await collabList();

      return collabListResp;
    }

    return [];
  },
};
