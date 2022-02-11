import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards ActionSet component
 * https://adaptivecards.io/explorer/ActionSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ActionSet({
  data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-action-set', className);
  const [shownCards, setShownCards] = useState({});

  const toggleCard = (index) => {
    setShownCards({...shownCards, [index]: !shownCards[index]});
  };

  return (
    <>
      <div className={cssClasses} style={style}>
        {data.actions.map((action, index) => (
          <Component data={action} key={index} inherited={inherited} onClick={action.type === 'Action.ShowCard' && (() => toggleCard(index))} pressed={shownCards[index]} />
        ))}
      </div>
      <div>
        {data.actions.map((action, index) => (
          shownCards[index] && <Component data={action.card} inherited={inherited} key={index} />
        ))}
      </div>
    </>
  );
}

ActionSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ActionSet.defaultProps = {
  className: '',
  style: undefined,
};

ActionSet.acPropTypes = {
  actions: acPropTypes.children,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  type: acPropTypes.type,
};

ActionSet.acDefaultProps = {
  isVisible: true,
};

registerComponent('ActionSet', ActionSet, 'horizontal');
