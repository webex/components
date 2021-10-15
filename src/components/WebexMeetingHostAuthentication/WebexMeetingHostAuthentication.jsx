import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import {InputField} from '../generic';

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
  const [hostKey, setHostKey] = useState('');

  const [cssClasses, sc] = webexComponentClasses('meeting-host-authentication', className);

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('header')}>
        <div className={sc('logo')} />
        <div className={sc('title')}>Enter host information to join</div>
      </div>
      <form className={sc('form-content')}>
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
