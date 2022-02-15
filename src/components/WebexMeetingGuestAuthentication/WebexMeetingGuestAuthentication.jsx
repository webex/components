import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {PHONE_LARGE} from '../breakpoints';
import {useElementDimensions, useMeeting, useRef} from '../hooks';
import {AdapterContext} from '../hooks/contexts';
import Spinner from '../generic/Spinner/Spinner';

const HINTS = {
  logo: 'Webex by Cisco logo',
  name: 'Your name appears in the participant list. Skip this optional field to use the name provided by the system.',
  password: 'The password is provided in the invitation for a scheduled  meeting, or from the host.',
  buttonHint: 'Start meeting. Start the meeting after entering the required information.',
  hostLink: 'Click to go to a new screen where the meeting host can enter the host key.',
};

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
 * @param {Function} props.switchToHostModal  A callback function to switch from guest form to host form
 * @returns {object} JSX of the component
 */
export default function WebexMeetingGuestAuthentication({
  className, meetingID, style, switchToHostModal,
}) {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState();
  const {ID, invalidPassword} = useMeeting(meetingID);
  const [isJoining, setIsJoining] = useState(false);
  const adapter = useContext(AdapterContext);
  const ref = useRef();
  const {width} = useElementDimensions(ref);

  const [cssClasses, sc] = webexComponentClasses('meeting-guest-authentication', className, {
    phone: width <= PHONE_LARGE,
  });

  const isStartButtonDisabled = nameError || !password || invalidPassword || isJoining;

  const joinMeeting = () => {
    setIsJoining(true);
    adapter.meetingsAdapter.joinMeeting(ID, {name, password}).finally(() => setIsJoining(false));
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError(getNameError(value));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    adapter.meetingsAdapter.clearInvalidPasswordFlag(ID);
  };

  const handleHostClick = (event) => {
    event.preventDefault();
    switchToHostModal();
  };

  const title = 'Enter meeting information to join';

  return (
    <div ref={ref} className={cssClasses} style={style}>
      <div className={sc('header')}>
        <div className={sc('logo')} aria-label={HINTS.logo} />
        <div className={sc('title')} title={title}>{title}</div>
      </div>
      <form className={sc('form-content')}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <InputField
          className={sc('input')}
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          disabled={isJoining}
          error={nameError}
          label="Your name"
          ariaLabel={HINTS.name}
          autoFocus
          tabIndex={101}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <InputField
          className={sc('input')}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={isJoining}
          error={invalidPassword ? 'Incorrect password. Try again.' : ''}
          label="Meeting password (required)"
          ariaLabel={HINTS.password}
          tabIndex={102}
        />
        <Button
          type="primary"
          className={sc('start-button')}
          size={28}
          onClick={joinMeeting}
          isDisabled={isStartButtonDisabled}
          ariaLabel={HINTS.buttonHint}
          tabIndex={103}
        >
          {isJoining && <Spinner className={sc('start-button-spinner')} size={18} />}
          {isJoining ? 'Starting meeting...' : 'Start meeting'}
        </Button>
      </form>
      <div className={sc('host-text')}>
        Hosting the meeting?
        {' '}
        {/* eslint-disable-next-line */}
        <a href="#" tabIndex={104} className={sc('host-hyperlink')} onClick={handleHostClick} aria-label={HINTS.hostLink}>Enter host key.</a>
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
