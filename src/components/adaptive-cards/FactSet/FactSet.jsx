import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards FactSet component
 * https://adaptivecards.io/explorer/FactSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function FactSet({data, className}) {
  const [cssClasses, sc] = webexComponentClasses('adaptive-cards-fact-set', className);

  return (
    <div className={cssClasses}>
      <table>
        <tbody>
          {data.facts.map((fact, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <th className={sc('fact-title')}>{fact.title}</th>
              <td>{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FactSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

FactSet.defaultProps = {
  className: '',
};

FactSet.acPropTypes = {
  facts: acPropTypes.children,
  fallback: acPropTypes.fallback,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  type: acPropTypes.type,
};

FactSet.acDefaultProps = {
  isVisible: true,
};

registerComponent('FactSet', FactSet);
