import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

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
  const [hostKey, setHostKey] = useState('');
  const {ID} = useMeeting(meetingID);
  const adapter = useContext(AdapterContext);

  const cssClasses = webexComponentClasses('meeting-host-authentication', className);

  const joinMeeting = () => {
    adapter.meetingsAdapter.joinMeeting(ID, {name, hostKey});
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
          Your name
          <InputField type="text" name="name" value={name} onChange={(value) => setName(value)} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Host key (required)
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
