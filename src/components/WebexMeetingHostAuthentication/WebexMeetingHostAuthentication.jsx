import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';
import Spinner from '../generic/Spinner/Spinner';

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
  const [hostKey, setHostKey] = useState('');
  const {ID, invalidHostKey} = useMeeting(meetingID);
  const [isJoining, setIsJoining] = useState(false);
  const adapter = useContext(AdapterContext);

  const [cssClasses, sc] = webexComponentClasses('meeting-host-authentication', className);

  const isStartButtonDisabled = !hostKey || invalidHostKey || isJoining;

  const joinMeeting = () => {
    setIsJoining(true);
    adapter.meetingsAdapter.joinMeeting(ID, {hostKey}).finally(() => setIsJoining(false));
  };

  const handleHostKeyChange = (value) => {
    setHostKey(value);
    adapter.meetingsAdapter.clearInvalidHostKeyFlag(ID);
  };

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('header')}>
        <div className={sc('logo')} />
        <div className={sc('title')}>Enter host information to join</div>
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
          />
        </label>
        <Button type="primary" className={sc('start-button')} onClick={joinMeeting} isDisabled={isStartButtonDisabled}>
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
