import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {PHONE_LARGE} from '../breakpoints';
import {useElementDimensions, useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';
import Spinner from '../generic/Spinner/Spinner';

const HINTS = {
  logo: 'Webex by Cisco logo',
  password: 'The host key is generated when a meeting is scheduled.',
  button: 'Start the meeting for all participants after entering the required information.',
};

/**
 * Webex Meeting Host Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexMeetingHostAuthentication({
  className, meetingID, style,
}) {
  const [hostKey, setHostKey] = useState('');
  const {ID, invalidHostKey} = useMeeting(meetingID);
  const [isJoining, setIsJoining] = useState(false);
  const adapter = useContext(AdapterContext);
  const [ref, {width}] = useElementDimensions();

  const [cssClasses, sc] = webexComponentClasses('meeting-host-authentication', className, {
    phone: width <= PHONE_LARGE,
  });

  const isStartButtonDisabled = !hostKey || invalidHostKey || isJoining;

  const joinMeeting = () => {
    setIsJoining(true);
    adapter.meetingsAdapter.joinMeeting(ID, {hostKey}).finally(() => setIsJoining(false));
  };

  const handleHostKeyChange = (value) => {
    setHostKey(value);
    adapter.meetingsAdapter.clearInvalidHostKeyFlag(ID);
  };

  const title = 'Enter host information to join';

  return (
    <div ref={ref} className={cssClasses} style={style}>
      <div className={sc('header')}>
        <div className={sc('logo')} aria-label={HINTS.logo} />
        <div className={sc('title')} title={title}>{title}</div>
      </div>
      <form className={sc('form-content')} onSubmit={(e) => { e.preventDefault(); }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={sc('label')}>
          <span className={sc('label-text')}>Host key (required)</span>
          <InputField
            type="password"
            name="password"
            value={hostKey}
            disabled={isJoining}
            onChange={handleHostKeyChange}
            error={invalidHostKey ? 'Incorrect host key. Try again.' : ''}
            ariaLabel={HINTS.password}
            autoFocus
          />
        </label>
        <Button
          type="primary"
          className={sc('start-button')}
          size={28}
          onClick={joinMeeting}
          isDisabled={isStartButtonDisabled}
          ariaLabel={HINTS.button}
        >
          {isJoining && <Spinner className={sc('start-button-spinner')} size={16} />}
          {isJoining ? 'Starting meeting...' : 'Start meeting'}
        </Button>
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
