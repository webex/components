import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useActivity} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

import ActivityHeader from './ActivityHeader';
import WebexAdaptiveCards from '../WebexAdaptiveCards/WebexAdaptiveCards';

/**
 * WebexActivity component displays activity content.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexActivity({ activityID, className, style }) {
  const activity = useActivity(activityID);
  const adapter = useContext(AdapterContext);
  const hasCards = adapter?.activitiesAdapter?.hasAdaptiveCards(activity);

  const [cssClasses, sc] = webexComponentClasses("activity", className);

  function downloadFile(url, name) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={cssClasses} key={activity.ID} style={style}>
      {activity.displayHeader && (
        <ActivityHeader
          personID={activity.personID}
          timestamp={activity.created}
        />
      )}
      <div className={sc("content")}>
        {!hasCards && activity.text && (
          <div className={sc("message")}>{activity.text}</div>
        )}
        {hasCards && <WebexAdaptiveCards activityID={activity.ID} />}

        {/* ✅ Accessible screenshot rendering for shared files */}
        {activity?.object?.files?.length > 0 && (
          <div className={sc("attachments")}>
            {activity.object.files.map((file) => (
              <div
                className="share-file-wrapper"
                tabIndex="0"
                role="group"
                key={file.url}
              >
                <img
                  src={file.url}
                  alt={file.displayName || "shared file"}
                  className="shared-screenshot"
                />
                <div className="webex-share-item-actions">
                  <button
                    type="button"
                    className="md-button md-button--32"
                    aria-label={`Download ${file.displayName}`}
                    onClick={() => downloadFile(file.url, file.displayName)}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

WebexActivity.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexActivity.defaultProps = {
  className: '',
  style: undefined,
};