import React from 'react';
import WebexSearchPeople from './WebexSearchPeople';
import People from '../../data/people';

export default {
  title: 'Platform/Webex Search People',
  component: WebexSearchPeople,
};

const Template = (args) => <WebexSearchPeople {...args} />;

export const searchPeople = Template.bind({});

searchPeople.args = {
  addedSpaceMembers: (error, members) => console.log('memebers added', error, members),
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
  className: '',
};
