import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

import Component from '../Component/Component';
import '../Column/Column';
import '../ColumnSet/ColumnSet';
import '../Container/Container';
import '../FactSet/FactSet';
import '../Image/Image';
import '../ImageSet/ImageSet';
import '../InputDate/InputDate';
import '../InputNumber/InputNumber';
import '../InputText/InputText';
import '../InputTime/InputTime';
import '../InputToggle/InputToggle';
import '../RichTextBlock/RichTextBlock';
import '../TextBlock/TextBlock';

/**
 * AdaptiveCard component
 *
 * @param {object} props  React properties
 * @param {object} props.data  Active Cards definition
 * @returns {object} JSX of the component
 */
export default function AdaptiveCard({data}) {
  const [cssClasses] = webexComponentClasses('adaptive-card');

  return (
    <div className={cssClasses}>
      {/* eslint-disable react/no-array-index-key */}
      {data.body.map((item, index) => <Component data={item} key={index} parentData={data} />)}
    </div>
  );
}

AdaptiveCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
