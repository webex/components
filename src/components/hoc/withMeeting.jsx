import React, {useEffect, useContext, useState} from 'react';
import {concatMap} from 'rxjs/operators';
import PropTypes from 'prop-types';
import {AdapterContext} from '../hooks/contexts';

/**
 * withMeeting is a higher-order component that takes a component (WrappedComponent)
 * and returns a new component (WithMeeting). The new component needs to be provided with a meeting destination
 * on the "meetingDestination" prop. The wrapped component will receive the meeting object on the "meeting" prop.
 *
 * Example:
 *
 * function OriginalComponent {
 *  return <div>Meeting id is {props.meeting.ID}</div>;
 *
 * }
 *
 * const EnhancedComponent = withMeeting(OriginalComponent);
 *
 * <EnhancedComponent meetingDestination="<MEETING_DESTINATION>" />
 *
 * @param {React.Component} WrappedComponent The component to wrap and enhance
 * @returns {React.Component} The enhanced component
 */
export default function withMeeting(WrappedComponent) {
  /**
   * @param {object} props  Data to be forwarded to WrappedComponent
   * @param {string} props.meetingDestination Virtual location where the meeting should take place
   * @returns {object} JSX of the component
   */
  function WithMeeting(props) {
    const [meeting, setMeeting] = useState({});
    const {meetingsAdapter} = useContext(AdapterContext);
    const {meetingDestination} = props;

    useEffect(() => {
      const subscription = meetingsAdapter
        .createMeeting(meetingDestination)
        .pipe(concatMap(({ID}) => meetingsAdapter.getMeeting(ID)))
        .subscribe(
          (newMeeting) => setMeeting({...newMeeting}),
          (error) => {
            setMeeting({error});
            // eslint-disable-next-line no-console
            console.log(error);
          },
        );

      return () => {
        subscription.unsubscribe();
      };
    }, [meetingsAdapter, meetingDestination]);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent meeting={meeting} {...props} />;
  }

  WithMeeting.propTypes = {
    meetingDestination: PropTypes.string.isRequired,
  };

  return WithMeeting;
}
