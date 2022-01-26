import React from 'react';
import PropTypes from 'prop-types';
import {isValidUrl} from '../../../util';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import Action from '../Action/Action';

/**
 * Adaptive Cards Action.OpenUrl component
 * https://adaptivecards.io/explorer/Action.OpenUrl.html
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.data  Active cards definition
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ActionOpenUrl({className, data, style}) {
  const [cssClasses] = webexComponentClasses('ac-action-open-url', className);
  const isValidHttpUrl = isValidUrl(data.url, ['https:', 'http:']);

  return (
    <Action data={data} className={cssClasses} onClick={() => isValidHttpUrl && window.open(data.url, '_blank')} style={style} />
  );
}

ActionOpenUrl.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ActionOpenUrl.defaultProps = {
  className: undefined,
  style: undefined,
};

ActionOpenUrl.acPropTypes = {
  fallback: acPropTypes.fallback,
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnabled: acPropTypes.isEnabled,
  mode: acPropTypes.mode,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  tooltip: acPropTypes.tooltip,
  type: acPropTypes.type,
  url: acPropTypes.url,
};

ActionOpenUrl.acDefaultProps = {
  style: 'default',
};

registerComponent('Action.OpenUrl', ActionOpenUrl);
