import React from 'react';
import {create, act} from 'react-test-renderer';
import PropTypes from 'prop-types';

import * as meetingDest from '../hooks/useMeetingDestination';
import withMeeting from './withMeeting';

describe('withMeeting', () => {
    let testRenderer;

    const mockUseMeetingDestination = jest.fn();
    const propFunc = jest.fn();
    jest.spyOn(meetingDest, 'default').mockImplementation(mockUseMeetingDestination);

    function TestComponent({meetingDestination, prop1, prop2}) {
        propFunc(meetingDestination, prop1, prop2);
        return <div />;
    }

    TestComponent.propTypes = {
        meetingDestination: PropTypes.string.isRequired,
        prop1: PropTypes.string.isRequired,
        prop2: PropTypes.string.isRequired,
      };
    
    const TestComponentWithMeeting = withMeeting(TestComponent);

    act(() => {
        global.testRendererAct = act;
        testRenderer = create(
          <TestComponentWithMeeting meetingDestination="test" prop1="value1" prop2="value2" />,
        );
      });

    it('forwards all props', () => {
        expect(propFunc).toBeCalledWith("test", "value1", "value2");
    });

    it('checks for useMeetingDestination call', () => {
        expect(mockUseMeetingDestination).toBeCalledWith('test');
    });
});
