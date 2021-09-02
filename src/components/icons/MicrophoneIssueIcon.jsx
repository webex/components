import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Microphone issue SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Additional className for the component
 * @param {object} [props.style]  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function MicrophoneIssueIcon({
  className,
  style,
}) {
  const cssClasses = webexComponentClasses('microphone-issue-icon', className);

  return (
    <svg width="62" height="91" viewBox="0 0 62 91" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <path d="M25.8672 65.2V69.2001C25.8672 80.2001 34.8672 89.2001 45.8672 89.2001M25.8672 65.2C32.4336 65.2 38.1092 61.1912 40.5672 55.5M25.8672 65.2C13.0672 65.2 9.86719 55.5 9.86719 49.3V17.3C9.86719 8.50005 17.0672 1.30005 25.8672 1.30005C34.2297 1.30005 41.1473 7.80188 41.8145 16M49.8672 89.2001H1.86719M40.9514 28.55V38.45M56.3514 39.35L46.1514 20.15C43.8514 15.95 37.8514 15.95 35.6514 20.15L21.7514 45.6501C19.5514 49.65 22.4514 54.5501 27.0514 54.5501H40.7456M40.7456 54.5501H55.9514C58.1514 54.5501 59.9514 52.7501 59.9514 50.5501C59.9514 48.3501 58.1514 46.5501 55.9514 46.5501C46.1033 46.5501 41.7664 52.8008 40.7456 54.5501ZM40.7456 54.5501C40.5795 54.8346 40.5012 55 40.5012 55" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="paint0_linear" x1="30.9093" y1="1.30005" x2="30.9093" y2="89.2001" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--wxc-icon--error--gradient-start-color)" />
          <stop offset="1" stopColor="var(--wxc-icon--error--gradient-stop-color)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

MicrophoneIssueIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

MicrophoneIssueIcon.defaultProps = {
  className: undefined,
  style: undefined,
};
