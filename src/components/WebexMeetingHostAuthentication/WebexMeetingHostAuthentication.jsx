import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button, InputField} from '../generic';

/**
 * Webex Meeting Host Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingHostAuthentication({className, style}) {
  const [name, setName] = useState();
  const [hostKey, setHostKey] = useState('');

  const cssClasses = webexComponentClasses('meeting-host-authentication', className);

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
          <InputField type="text" name="name" value={name} onChange={(value) => setName(value)} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Host key (required)</span>
          <InputField
            type="password"
            name="password"
            value={hostKey}
            onChange={(event) => setHostKey(event.target.value)}
          />
        </label>
        <Button type="primary">Start Meeting</Button>
      </form>
    </div>
  );
}

WebexMeetingHostAuthentication.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexMeetingHostAuthentication.defaultProps = {
  className: '',
  style: undefined,
};
