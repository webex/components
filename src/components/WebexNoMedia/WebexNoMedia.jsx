import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

import Icon from '../generic/Icon/Icon';
import Title from '../generic/Title/Title';
/**
 * Component for displaying a user-friendly message when no user media is present
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexNoMedia({className, style}) {
  const cssClasses = webexComponentClasses('no-media', className);

  /* eslint-disable react/jsx-one-expression-per-line */
  const message = (
    <>
      <p>Reload this page and select <span>Allow</span> when your browser asks.</p>
      <p>
        <div><b>Still not working?</b></div>
        You may need to update your webpage permissions.
        Go to your <b>browser settings</b>, look for website settings,
        select <b>Allow for Camera</b>, then reload this page.
      </p>
    </>
  );
  /* eslint-enable react/jsx-one-expression-per-line */

  return (
    <div className={cssClasses} style={style}>
      <Icon className="icon-media-issue" name="camera-issue" />
      <Title>Can’t access camera</Title>
      <div className="body">
        {message}
      </div>
    </div>
  );
}

WebexNoMedia.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexNoMedia.defaultProps = {
  className: undefined,
  style: undefined,
};
