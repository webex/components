import React from 'react';
import format from 'date-fns/format';
import startOfToday from 'date-fns/startOfToday';
import startOfYesterday from 'date-fns/startOfYesterday';
import startOfWeek from 'date-fns/startOfWeek';

import TimeRuler from './TimeRuler';

describe('Time Ruler component', () => {
  describe('snapshot', () => {
    test('matches with time from today snapshot', () => {
      // const now = new Date(Date.now());
      // const today = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
      const today = format(startOfToday(), 'yyyy/MM/dd');
      console.log('today', today)

      expect(shallow(<TimeRuler date={today} />)).toMatchSnapshot();
    });

    test('matches with time from yesterday snapshot', () => {
      const yesterday = format(startOfYesterday(), 'yyyy/MM/dd');
      console.log('yesterday', yesterday)

      expect(shallow(<TimeRuler date={yesterday} />)).toMatchSnapshot();
    });

    test('matches with time from this week snapshot', () => {
      const earlierInWeek = format(startOfWeek(startOfToday()), 'yyyy/MM/dd');
      console.log('earlierInWeek', earlierInWeek)

      expect(shallow(<TimeRuler date={earlierInWeek} />)).toMatchSnapshot();
    });

    test('matches with older time snapshot', () => {
      expect(shallow(<TimeRuler date="2019/9/20" />)).toMatchSnapshot();
    });
  });
});
