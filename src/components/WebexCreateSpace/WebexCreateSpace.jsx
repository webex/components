// eslint-disable-next-line import/no-unresolved
import React, {useState, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import {forkJoin} from 'rxjs';
import {InputField, Button} from '../generic';
import webexComponentClasses from '../helpers';
import WebexSearchPeople from '../WebexSearchPeople/WebexSearchPeople';
import {AdapterContext} from '../hooks/contexts';
import {useMetrics} from '../hooks';

/**
 * Webex Create Space Component
 *
 * @param {object} props Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} props.spaceName Name of space to be created
 * @param {boolean} props.createSpace Boolean to call the webex create space api
 * @param {Function} props.createSpaceResponse Callback function to return response
 *  of the create space api
 * @param {boolean} props.webexLookAhead Boolean to search people in webex sdk
 * @param {Function} props.memberLookAhead Callback function to search people from collaborators
 * @param {object} props.style Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexCreateSpace({
  spaceName,
  createSpace,
  createSpaceResponse,
  webexLookAhead,
  memberLookAhead,
  style,
  className,
}) {
  const [spaceTitle, setSpaceTitle] = useState(spaceName);
  const [cssClasses, sc] = webexComponentClasses('create-space', className);
  const [addedSpaceMembers, setAddedSpaceMembers] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const adapter = useContext(AdapterContext);
  const addCollaboratorsRef = useRef();
  const [emitMetrics] = useMetrics();
  let startTime = window.performance.now();
  const Id = adapter.peopleAdapter.getMe().ID;
  const {orgID} = adapter.peopleAdapter.getMe();

  const handleCancel = () => {
    setSpaceTitle('');
    setAlertMsg('');
    addCollaboratorsRef.current.clearInput();
  };

  const showBanner = (isError, msg) => {
    const bannerData = (
      <span className={isError ? sc('error') : sc('success')}>
        {msg}
      </span>
    );

    setAlertMsg(bannerData);
  };

  const handleSpaceName = (name) => {
    setSpaceTitle(name);
  };

  const isCreateSpaceResponse = (error, data = {}) => {
    if (createSpaceResponse) {
      createSpaceResponse(error, data);
    }
  };

  const onError = (error) => {
    const endTime = window.performance.now();

    emitMetrics({
      fields: {
        startTime,
        endTime,
        totalTime: endTime - startTime,
      },
      metricName: 'createSpaceError',
      tag: 'webex_widgets',
      type: 'operational',
    }, 'loginId');
    showBanner(true, error.message);
    isCreateSpaceResponse({error: error.message});
    emitMetrics({
      fields: {
        orgID,
        Id,
      },
      metricName: 'businessMetrics',
      type: 'business',
    }, '');
  };

  const addMembersSuccess = () => {
    const endTime = window.performance.now();

    emitMetrics({
      fields: {
        startTime,
        endTime,
        totalTime: endTime - startTime,
      },
      metricName: 'addMembersSuccess',
      tag: 'webex_widgets',
      type: 'operational',
    }, 'loginId');
    showBanner(false, 'space created successfully');
    isCreateSpaceResponse(null, {data: {spaceTitle, addedSpaceMembers}, msg: 'space created successfully'});

    emitMetrics({
      fields: {
        orgID,
        Id,
      },
      metricName: 'businessMetrics',
      type: 'business',
    }, '');
  };

  const createRoomSuccess = (data) => {
    const membership = [];
    const endTime = window.performance.now();

    emitMetrics({
      fields: {
        startTime,
        endTime,
        totalTime: endTime - startTime,
      },
      metricName: 'createSpaceSuccess',
      tag: 'webex_widgets',
      type: 'operational',
    }, 'loginId');

    addedSpaceMembers.forEach((personId) => {
      membership.push(adapter.membershipsAdapter.addRoomMember(personId, data.ID));
    });

    emitMetrics({
      fields: {
        orgID,
        Id,
      },
      metricName: 'businessMetrics',
      type: 'business',
    }, '');

    return forkJoin(membership)
      .subscribe(addMembersSuccess, onError);
  };

  const handleCreateSpace = () => {
    startTime = window.performance.now();
    if (createSpace) {
      if (spaceTitle) {
        adapter.roomsAdapter.createRoom({title: spaceTitle}).subscribe(createRoomSuccess, onError);
      } else {
        showBanner(true, 'space name is missing');
        isCreateSpaceResponse({error: 'space name is missing'});
      }
    } else {
      isCreateSpaceResponse(null, {data: {spaceTitle, addedSpaceMembers}});
    }
  };

  const handleAddedSpaceMembers = (error, members) => {
    setAddedSpaceMembers(members);
  };

  return (
    <div className={cssClasses} style={style}>
      <InputField
        placeholder="Enter space name"
        label="Space name"
        onChange={handleSpaceName}
        value={spaceTitle}
      />
      <WebexSearchPeople
        addedSpaceMembers={handleAddedSpaceMembers}
        ref={addCollaboratorsRef}
        webexLookAhead={webexLookAhead}
        memberLookAhead={memberLookAhead}
      />
      {alertMsg}
      <div className={sc('buttons')}>
        <Button
          type="primary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="join"
          onClick={handleCreateSpace}
        >
          Create new Space
        </Button>
      </div>
    </div>
  );
}

WebexCreateSpace.propTypes = {
  spaceName: PropTypes.string,
  createSpace: PropTypes.bool,
  createSpaceResponse: PropTypes.func,
  webexLookAhead: PropTypes.bool,
  memberLookAhead: PropTypes.func,
  style: PropTypes.shape(),
  className: PropTypes.string,
};

WebexCreateSpace.defaultProps = {
  spaceName: '',
  createSpace: true,
  createSpaceResponse: undefined,
  webexLookAhead: true,
  memberLookAhead: undefined,
  style: undefined,
  className: '',
};
