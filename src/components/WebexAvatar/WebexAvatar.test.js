import React from 'react';

import WebexAvatar from './WebexAvatar';

describe('Webex Avatar component:', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WebexAvatar />);
  });

  test('exists', () => {
    expect(wrapper).toMatchSnapshot();
  });

  afterEach(() => {
    wrapper = null;
  });
});
