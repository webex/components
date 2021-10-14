import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

/**
 * Helper function for checking name format
 *
 * @param {string} name  Input value
 * @returns {string} returns the error if exists
 */
function getNameError(name) {
  let error;

  if (!name.match(/^[a-zA-Z ]*$/)) {
    error = 'Name can only contain letters.';
  }

  return error;
}

/**
 * Webex Meeting Host Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingHostAuthentication({className, meetingID, style}) {
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [hostKey, setHostKey] = useState('');
  const {ID} = useMeeting(meetingID);
  const adapter = useContext(AdapterContext);

  const cssClasses = webexComponentClasses('meeting-host-authentication', className);

  const joinMeeting = () => {
    adapter.meetingsAdapter.joinMeeting(ID, {name, hostKey});
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError(getNameError(value));
  };

  return (
    <div className={cssClasses} style={style}>
      <div className="auth-header">
        <div className="auth-logo" />
        <div className="auth-title">Enter host information to join</div>
      </div>
      <form className="form-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Your name</span>
          <InputField type="text" name="name" value={name} onChange={handleNameChange} error={nameError} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Host key (required)</span>
          <InputField
            type="password"
            name="password"
            value={hostKey}
            onChange={(value) => setHostKey(value)}
          />
        </label>
        <Button type="primary" onClick={joinMeeting}>Start Meeting</Button>
      </form>
    </div>
  );
}

WebexMeetingHostAuthentication.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMeetingHostAuthentication.defaultProps = {
  className: '',
  style: undefined,
};
