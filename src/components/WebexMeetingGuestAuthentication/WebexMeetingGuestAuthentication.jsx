import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

/**
 * Webex Meeting Guest Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @param {Function} props.switchToHostModal  A callback function to switch from guest form to host form
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingGuestAuthentication({
  className, meetingID, style, switchToHostModal,
}) {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');
  const {ID} = useMeeting(meetingID);
  const adapter = useContext(AdapterContext);

  const cssClasses = webexComponentClasses('meeting-guest-authentication', className);

  const joinMeeting = () => {
    adapter.meetingsAdapter.joinMeeting(ID, {name, password});
  };

  return (
    <div className={cssClasses} style={style}>
      <div className="auth-header">
        <div className="auth-logo" />
        <div className="auth-title">Enter meeting information to join</div>
      </div>
      <form className="form-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Your name
          <InputField type="text" name="name" value={name} onChange={(value) => setName(value)} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Meeting password (required)
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </label>
        <Button type="primary" onClick={joinMeeting}>Start Meeting</Button>
      </form>
      <div className="host-text">
        Hosting the meeting?
        {' '}
        {/* eslint-disable-next-line */}
        <a className="host-hyperlink" onClick={switchToHostModal}>Enter host key.</a>
      </div>
    </div>
  );
}

WebexMeetingGuestAuthentication.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  switchToHostModal: PropTypes.func,
};

WebexMeetingGuestAuthentication.defaultProps = {
  className: '',
  style: undefined,
  switchToHostModal: undefined,
};
