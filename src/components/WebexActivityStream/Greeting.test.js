import React from 'react';

import Greeting, {GreetingSpaceSVG, GreetingDirectSVG} from './Greeting';

describe('Activity Stream Greeting component', () => {
  describe('Greeting Space SVG snapshot', () => {
    test('matches with greeting space SVG', () => {
      expect(shallow(<GreetingSpaceSVG />)).toMatchSnapshot();
    });
  });

  describe('Greeting 1:1 SVG snapshot', () => {
    test('matches with greeting 1:1 SVG', () => {
      expect(shallow(<GreetingDirectSVG />)).toMatchSnapshot();
    });
  });
  describe('Greeting component snapshot', () => {
    test('matches with empty space', () => {
      expect(shallow(<Greeting personName="" />)).toMatchSnapshot();
    });

    test('matches with empty 1:1', () => {
      expect(shallow(<Greeting personName="personName" />)).toMatchSnapshot();
    });
  });
});
