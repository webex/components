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
 * Webex Meeting Guest Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @param {function} props.switchToHostModal  A callback function to switch from guest form to host form
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingGuestAuthentication({
  className, meetingID, style, switchToHostModal,
}) {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState();
  const {ID, invalidPassword} = useMeeting(meetingID);
  const adapter = useContext(AdapterContext);

  const [cssClasses, sc] = webexComponentClasses('meeting-guest-authentication', className);

  const isStartButtonDisabled = nameError || !password || invalidPassword;

  const joinMeeting = () => {
    adapter.meetingsAdapter.joinMeeting(ID, {name, password});
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError(getNameError(value));
  };

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('header')}>
        <div className={sc('logo')} />
        <div className={sc('title')}>Enter meeting information to join</div>
      </div>
      <form className={sc('form-content')}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={sc('label')}>
          <span className={sc('label-text')}>Your name</span>
          <InputField type="text" name="name" value={name} onChange={handleNameChange} error={nameError} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={sc('label')}>
          <span className={sc('label-text')}>Meeting password (required)</span>
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </label>
        <Button type="primary" onClick={joinMeeting} isDisabled={isStartButtonDisabled}>Start meeting</Button>
      </form>
      <div className={sc('host-text')}>
        Hosting the meeting?
        {' '}
        {/* eslint-disable-next-line */}
        <a className={sc('host-hyperlink')} onClick={switchToHostModal}>Enter host key.</a>
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
