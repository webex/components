import React from 'react';
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
 * class OriginalComponent extends Component {
 *   render(props) {
 *     return <div>Meeting id is {props.meeting.ID}</div>;
 *   }
 * }
 * 
 * const EnhancedComponent = withMeeting(OriginalComponent);
 * 
 * <EnhancedComponent meetingDestination="<MEETING_DESTINATION>" />
 * 
 * @param {React.Component} WrappedComponent The component to wrap and enhance 
 * @returns {React.Component} The wrapped component
 */

export default function withMeeting(WrappedComponent) {
  class WithMeeting extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        meeting: {},
      };
    }

    componentDidMount() {
      const {meetingsAdapter} = this.context;
      this.meetingSubscription = meetingsAdapter
        .createMeeting(this.props.meetingDestination)
        .pipe(concatMap(({ID}) => meetingsAdapter.getMeeting(ID)))
        .subscribe(
          (meeting) => this.setState({meeting}),
          (error) => {
            this.setState({meeting: {}});
            console.log(error);
          },
        );
    }

    componentWillUnmount() {
      this.meetingSubscription.unsubscribe();
    }

    render(props) {
      return <WrappedComponent meeting={this.state.meeting} {...props} />;
    }
  }

  WithMeeting.contextType = AdapterContext;
  WithMeeting.propTypes = {
    meetingDestination: PropTypes.string.isRequired,
  };

  return WithMeeting;
}
