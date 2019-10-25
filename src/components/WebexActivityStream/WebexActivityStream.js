import React, {Fragment, useRef} from 'react';
import PropTypes from 'prop-types';
import {ListSeparator} from '@momentum-ui/react';
import {RoomType} from '@webex/component-adapter-interfaces';
import {format, isToday, isSameWeek, isYesterday} from 'date-fns';

import {useActivityStream, useActivityScroll, useOverflowActivities, useRoom} from '../hooks';
import {PREPEND_ACTIVITIES} from '../hooks/useActivityStream';
import WebexActivity from '../WebexActivity/WebexActivity';

import './WebexActivityStream.scss';

/**
 * Returns a formatted timestamp based on the given date's offset from the current time.
 *
 * Divisor for messages from today display today
 * Divisor for messages from dates from a previous day display as Yesterday
 * Divisor for messages of dates from a previous day of the week (but not yesterday) display as <day of the week>
 * Divisor for messages of dates older than a week from today display as M/D/YY
 *
 * @param {Date} timestamp Date instance to format
 * @returns {string} formattedDate
 */
export function formatTimeRulerText(timestamp) {
  let formattedDate;

  if (isToday(timestamp)) {
    formattedDate = 'today';
  } else if (isYesterday(timestamp)) {
    // Yesterday
    formattedDate = 'Yesterday';
  } else if (isSameWeek(timestamp, new Date())) {
    // Monday
    formattedDate = format(timestamp, 'iiii');
  } else {
    // 1/1/2020
    formattedDate = format(timestamp, 'P');
  }

  return formattedDate;
}

export function GreetingDirectSVG() {
  return (
    <svg
      width="61px"
      height="60px"
      viewBox="0 0 61 60"
      version="1.1"
      xlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="one-on-one" stroke="#343537" strokeWidth="1.12800004">
          <g id="Group-39" transform="translate(9.056604, 6.895610)">
            <path
              d="M42.2831173,43.3165345 L42.1768007,41.8220793 C41.3164233,36.6788756 36.8550615,32.9083712 31.6258573,32.9083712 L10.9787695,32.9083712 C5.75153404,32.9083712 1.28820345,36.6788756 0.429794914,41.8220793 L0.323478261,43.3126069"
              id="Stroke-15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28.8517801,32.9472545 C31.9664643,32.2991991 35.0476784,31.2426723 38.0265135,29.7580362 L38.0265135,16.8362033 C38.0265135,7.54740855 30.4780312,0.0162187139 21.1635111,0.0162187139 C11.8509598,0.0162187139 4.30050861,7.54740855 4.30050861,16.8362033 L4.30050861,29.7580362 C6.81470057,31.0089796 10.4452174,32.279561 13.1700738,32.9472545"
              id="Stroke-27"
            />
            <path
              d="M9.72108285,12.4414055 C11.4733388,13.1660493 13.0543068,13.7257335 14.9168171,14.1165306 L16.5942576,9.9945052 L16.6926989,14.6506854 C21.4907301,15.08665 28.1197703,14.2716712 32.8784249,12.305903 L32.9335521,12.305903 C34.1995078,14.36397 34.9279737,16.783377 34.9279737,19.373635 C34.9279737,26.8498383 28.8521739,32.9101386 21.3568499,32.9101386 C13.8615258,32.9101386 7.78375718,26.8498383 7.78375718,19.373635 C7.78375718,16.9856488 8.40393765,14.7429842 9.49269893,12.7948903 L9.72108285,12.4414055 Z"
              id="Stroke-29"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M59.5436259,30.0538891 C59.5436259,13.8348286 46.360361,0.685194455 30.0998195,0.685194455 C23.531813,0.685194455 17.4855455,2.85716211 12.589073,6.48430882 L8.65338802,9.97398922 C3.70769483,15.227166 0.656013126,22.2772237 0.656013126,30.0538891 C0.656013126,46.2729496 13.8392781,59.4206199 30.0998195,59.4206199 C38.5086792,59.4206199 46.0965381,55.9054101 51.4615915,50.2653639 C56.4919442,44.9493454 59.5436259,37.8560839 59.5436259,30.0538891 Z"
            id="Stroke-31"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function GreetingSpaceSVG() {
  return (
    <svg
      width="61px"
      height="61px"
      viewBox="0 0 61 61"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="space" transform="translate(-14.000000, -3.000000)">
          <rect id="Rectangle-2" x="0" y="0" width="90" height="68" />
          <g id="Group" transform="translate(15.000000, 4.000000)" stroke="#343537">
            <path
              d="M1.77076923,19.42 C0.624615385,22.5692308 0,25.9676923 0,29.5123077 C0,45.8107692 13.2123077,59.0246154 29.5123077,59.0246154 C45.8107692,59.0246154 59.0246154,45.8107692 59.0246154,29.5123077 C59.0246154,13.2138462 45.8107692,0 29.5123077,0 C20.6169231,0 12.6415385,3.93538462 7.23076923,10.16"
              id="Stroke-9"
            />
            <path
              d="M56.9563077,23.8953846 C56.9563077,17.3984615 51.6901538,12.1323077 45.1932308,12.1323077 C38.6947692,12.1323077 33.4286154,17.3984615 33.4286154,23.8953846 C33.4286154,30.3923077 38.6947692,35.6584615 45.1932308,35.6584615 C51.6901538,35.6584615 56.9563077,30.3923077 56.9563077,23.8953846 Z"
              id="Stroke-11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.0841538,40.082 C33.3472308,37.1358462 36.0087692,35.6589231 38.7826154,35.6589231 L51.5703077,35.6589231 C53.9856923,35.6589231 56.1887692,36.8435385 57.5349231,38.7373846"
              id="Stroke-13"
              strokeLinecap="round"
            />
            <path
              d="M33.7678462,58.6032308 L32.8047692,42.5016923 C32.6586154,41.6278462 32.3832308,40.8032308 31.9986154,40.0463077"
              id="Stroke-15"
              strokeLinecap="round"
            />
            <path
              d="M31.9986154,40.0464615 C30.5786154,37.2495385 27.6801538,35.3849231 24.4016923,35.3849231 L7.95707692,35.3849231 C5.39246154,35.3849231 3.06015385,36.5264615 1.48630769,38.3618462"
              id="Stroke-17"
              strokeLinecap="round"
            />
            <path
              d="M22.5238462,35.4156923 C25.1838462,34.8603077 27.8161538,33.9572308 30.3623077,32.6849231 L30.3623077,21.6187692 C30.3623077,13.6618462 23.9115385,7.21261538 15.9561538,7.21261538 C8.00076923,7.21261538 1.55153846,13.6618462 1.55153846,21.6187692 L1.55153846,32.6849231 C3.69769231,33.7556923 6.80076923,34.8433846 9.12692308,35.4156923"
              id="Stroke-19"
            />
            <path
              d="M6.18107692,17.8535385 C7.678,18.4735385 9.02876923,18.952 10.6195385,19.2889231 L12.0533846,15.7581538 L12.138,19.7458462 C16.2349231,20.1181538 21.898,19.4212308 25.9641538,17.7381538 L26.0103077,17.7381538 C27.0918462,19.4996923 27.7149231,21.572 27.7149231,23.7904615 C27.7149231,30.1935385 22.5241538,35.3843077 16.1210769,35.3843077 C9.718,35.3843077 4.52723077,30.1935385 4.52723077,23.7904615 C4.52723077,21.7458462 5.05646154,19.8243077 5.98569231,18.1566154 L6.18107692,17.8535385 Z"
              id="Stroke-21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0.000153846167,29.5121538 C0.000153846167,45.8106154 13.2124615,59.0244615 29.5124615,59.0244615 C45.8109231,59.0244615 59.0247692,45.8106154 59.0247692,29.5121538"
              id="Stroke-23"
            />
            <path
              d="M39.0553846,14.1330769 C42.1815385,18.3853846 47.8369231,20.27 53.0507692,18.3823077 C54.4338462,17.8823077 55.6723077,17.1561538 56.7369231,16.2623077"
              id="Stroke-25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function Greeting({personName}) {
  let svg = <GreetingSpaceSVG />;
  let description = `This is a shared space between you and other group members. Here's where you'll see shared messages, files, and a call history with this space.`;

  if (personName) {
    svg = <GreetingDirectSVG />;
    description = `This is your private conversation with ${personName}. Here's where you'll see shared messages, files, and a call history with this person.`;
  }

  return (
    <div className="greeting">
      <div className="greeting-header">
        {svg}
        <div className="greeting-description">{description}</div>
      </div>
    </div>
  );
}

Greeting.propTypes = {
  personName: PropTypes.string.isRequired,
};

export function TimeRuler({text}) {
  return <ListSeparator className="time-ruler" role="listitem" text={text} />;
}

TimeRuler.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function WebexActivityStream({roomID}) {
  const [activitiesData, dispatch] = useActivityStream(roomID);
  const loadPreviousActivities = (previousActivities) => {
    dispatch({type: PREPEND_ACTIVITIES, payload: previousActivities});
  };

  const {title, roomType} = useRoom(roomID);
  const activityStreamRef = useRef(null);
  const showLoader = useActivityScroll(roomID, activityStreamRef, loadPreviousActivities);
  const lastActivityRef = useOverflowActivities(roomID, activityStreamRef, loadPreviousActivities);

  const personName = roomType === RoomType.DIRECT ? title : '';
  const activities = activitiesData.map((activity) => {
    // If the activity is an object with a date property, it is a time ruler
    const activityComponent = activity.date ? (
      <TimeRuler key={activity.date.toString()} text={formatTimeRulerText(new Date(activity.date))} />
    ) : (
      <WebexActivity key={activity} activityID={activity} />
    );

    return activityComponent;
  });

  return (
    <div className="activity-stream" ref={activityStreamRef}>
      {showLoader && <div className="activity-stream-loader" />}
      {activities.length ? <Fragment>{activities}</Fragment> : <Greeting personName={personName} />}
      <div className="last-activity" ref={lastActivityRef} />
    </div>
  );
}

WebexActivityStream.propTypes = {
  roomID: PropTypes.string.isRequired,
};
