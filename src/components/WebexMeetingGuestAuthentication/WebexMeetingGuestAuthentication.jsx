import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';

/**
 * Webex Meeting Guest Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @param {function} props.switchToHostModal A callback function to switch from guest form to host form
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingGuestAuthentication({className, style, switchToHostModal}) {
  const [name, setName] = useState();
  const [password, setPassword] = useState('');

  const cssClasses = webexComponentClasses('meeting-guest-authentication', className);

  return (
    <div className={cssClasses} style={style}>
      <div className="auth-header">
        <div className="auth-logo" />
        <div className="auth-title">Enter meeting information to join</div>
      </div>
      <form className="form-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Your name</span>
          <InputField type="text" name="name" value={name} onChange={(value) => setName(value)} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Meeting password (required)</span>
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <Button type="primary">Start Meeting</Button>
      </form>
      <div className="host-text">
        Hosting the meeting?
        {' '}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span className="host-hyperlink" onClick={switchToHostModal}>Enter host key.</span>
      </div>
    </div>
  );
}

WebexMeetingGuestAuthentication.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  switchToHostModal: PropTypes.func,
};

WebexMeetingGuestAuthentication.defaultProps = {
  className: '',
  style: undefined,
  switchToHostModal: undefined,
};
