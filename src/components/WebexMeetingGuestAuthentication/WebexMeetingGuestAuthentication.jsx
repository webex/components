import React, {useState, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, Icon} from '../generic';
import {PasswordInput, TextInput} from '../inputs';
import {PHONE_LARGE} from '../breakpoints';
import {useElementDimensions, useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';
import Spinner from '../generic/Spinner/Spinner';
import CaptchaInput from '../inputs/CaptchaInput/CaptchaInput';

const HINTS = {
  logo: 'Webex by Cisco logo',
  name: 'Your name appears in the participant list. Skip this optional field to use the name provided by the system.',
  password: 'The password is provided in the invitation for a scheduled meeting, or from the host.',
  captcha: 'The captcha is required',
  captchaImage: 'Captcha Image',
  captchaRefresh: 'Click to refresh the captcha image',
  buttonHint: 'Start meeting. Start the meeting after entering the required information.',
  hostLink: 'Click to go to a new screen where the meeting host can enter the host key.',
};

/**
 * Helper function for checking name format
 *
 * @param {string} name Input value
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
 * @param {object} props Data passed to the component
 * @param {string} props.className Custom CSS class to apply
 * @param {string} props.meetingID ID of the meeting
 * @param {object} props.style Custom style to apply
 * @param {Function} props.switchToHostModal A callback function to switch from guest form to host form
 * @returns {object} JSX of the component
 */
export default function WebexMeetingGuestAuthentication({
  className, meetingID, style, switchToHostModal,
}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const {
    ID, failureReason, invalidPassword, requiredCaptcha,
  } = useMeeting(meetingID);
  const [isJoining, setIsJoining] = useState(false);
  const adapter = useContext(AdapterContext);
  const ref = useRef();
  const {width} = useElementDimensions(ref);

  const [cssClasses, sc] = webexComponentClasses('meeting-guest-authentication', className, {
    phone: width <= PHONE_LARGE,
  });

  let passwordError = '';
  let captchaError = '';

  if (invalidPassword && failureReason === 'WRONG_PASSWORD') {
    if (!requiredCaptcha.captchaId) {
      passwordError = 'Incorrect password. Try again.';
    } else {
      captchaError = 'Incorrect password entered too many times. Enter captcha code';
    }
  } else if (failureReason === 'WRONG_CAPTCHA' && requiredCaptcha.captchaId) {
    captchaError = 'Invalid Captcha. Try again.';
  }

  const isStartButtonDisabled = nameError || !password || invalidPassword || isJoining;

  const joinMeeting = () => {
    setIsJoining(true);
    adapter.meetingsAdapter
      .joinMeeting(ID, {name, password, captcha})
      .finally(() => setIsJoining(false));
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError(getNameError(value));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    adapter.meetingsAdapter.clearInvalidPasswordFlag(ID);
  };

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
    adapter.meetingsAdapter.clearInvalidPasswordFlag(ID);
  };

  const refreshCaptcha = () => {
    adapter.meetingsAdapter.refreshCaptcha(ID);
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
        <TextInput
          ariaLabel={HINTS.name}
          autoFocus
          className={sc('input')}
          disabled={isJoining}
          error={nameError}
          label="Your name"
          name="name"
          onChange={handleNameChange}
          tabIndex={101}
          value={name}
        />
        <PasswordInput
          className={sc('input')}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={isJoining}
          error={passwordError}
          label="Meeting password (required)"
          ariaLabel={HINTS.password}
          tabIndex={102}
        />
        {requiredCaptcha && requiredCaptcha.verificationImageURL && (
          <div className={sc('captcha-image')} aria-label={HINTS.captchaImage}>
            <div className={sc('captcha-buttons')}>
              <img src={requiredCaptcha.verificationImageURL} alt="captcha" />
              <Button
                type="primary"
                className={sc('captcha-refresh-button')}
                size={28}
                onClick={refreshCaptcha}
                ariaLabel={HINTS.captchaRefresh}
                tabIndex={103}
              >
                <Icon name="refresh" />
              </Button>
            </div>
            <CaptchaInput
              className={sc('input')}
              type="captcha"
              name="captcha"
              value={captcha}
              onChange={handleCaptchaChange}
              error={captchaError}
              label="Enter Captcha"
              ariaLabel={HINTS.captcha}
              tabIndex={104}
            />
          </div>
        )}
        <Button
          type="primary"
          className={sc('start-button')}
          size={28}
          onClick={joinMeeting}
          isDisabled={isStartButtonDisabled}
          ariaLabel={HINTS.buttonHint}
          tabIndex={105}
        >
          {isJoining && <Spinner className={sc('start-button-spinner')} size={18} />}
          {isJoining ? 'Starting meeting...' : 'Start meeting'}
        </Button>
      </form>
      <div className={sc('host-text')}>
        Hosting the meeting?
        {' '}
        {/* eslint-disable-next-line */}
        <a href="#" tabIndex={106} className={sc('host-hyperlink')} onClick={handleHostClick} aria-label={HINTS.hostLink}>Enter host key.</a>
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
