import React from 'react';

import Avatar from './Avatar';

describe('Webex Avatar component:', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Avatar />);
  });

  test('exists', () => {
    expect(wrapper).toMatchSnapshot();
  });

  afterEach(() => {
    wrapper = null;
  });
});
