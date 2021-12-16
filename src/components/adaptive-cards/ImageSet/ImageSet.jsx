import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {registerComponent} from '../Component/Component';

/**
 * Adaptive Cards ImageSet component
 * https://adaptivecards.io/explorer/ImageSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function ImageSet({data}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-image-set');

  return (
    <div className={cssClasses}>
      {data.images.map((item) => <Component data={item} parentData={data} />)}
    </div>
  );
}

ImageSet.propTypes = {
  data: PropTypes.shape().isRequired,
};

registerComponent('ImageSet', ImageSet, 'horizontal');
