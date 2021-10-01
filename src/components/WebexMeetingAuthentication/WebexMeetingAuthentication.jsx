import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {Button} from '../generic';

/**
 * Webex Meeting Authentication component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingAuthentication({className, style}) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const cssClasses = webexComponentClasses('meeting-authentication', className);

  return (
    <div className={cssClasses} style={style}>
      <form className="form-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Your name
          <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Meeting password (required)
          <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <Button type="default">Start Meeting</Button>
      </form>
    </div>
  );
}

WebexMeetingAuthentication.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexMeetingAuthentication.defaultProps = {
  className: '',
  style: undefined,
};
