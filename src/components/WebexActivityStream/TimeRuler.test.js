import React from 'react';
import {format, startOfToday, startOfYesterday, startOfWeek} from 'date-fns';

import TimeRuler from './TimeRuler';

describe('Time Ruler component', () => {
  describe('snapshot', () => {
    test('matches with time from today snapshot', () => {
      const today = format(startOfToday(), 'yyyy/MM/dd');

      expect(shallow(<TimeRuler date={today} />)).toMatchSnapshot();
    });

    test('matches with time from yesterday snapshot', () => {
      const today = format(startOfToday(), 'yyyy/MM/dd');
      const yesterday = format(startOfYesterday(), 'yyyy/MM/dd');

      console.log('tday', today);
      console.log('yesterday', yesterday);

      expect(shallow(<TimeRuler date={yesterday} />)).toMatchSnapshot();
    });

    test('matches with time from this week snapshot', () => {
      const earlierInWeek = format(startOfWeek(startOfToday()), 'yyyy/MM/dd');

      console.log('earlierInWeek', earlierInWeek);

      expect(shallow(<TimeRuler date={earlierInWeek} />)).toMatchSnapshot();
    });

    test('matches with older time snapshot', () => {
      expect(shallow(<TimeRuler date="2019/9/20" />)).toMatchSnapshot();
    });
  });
});
