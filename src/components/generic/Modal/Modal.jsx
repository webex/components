import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {TABLET} from '../../breakpoints';
import {useElementDimensions} from '../../hooks';

/**
 * Modal component
 *
 * @param {object} props  Data passed to the component
 * @param {React.ReactNode[]} props.children  List of children
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {Function} [props.onClose]  Callback when the modal is closed
 * @param {string} [props.title]  Title of the modal
 *
 * @returns {object}  JSX of the element
 */
export default function Modal({
  children,
  className,
  onClose,
  title,
}) {
  const [ref, {width}] = useElementDimensions();
  const cssClasses = webexComponentClasses('modal', className, undefined, {
    'centered-modal': width > TABLET,
  });

  return (
    <div ref={ref} className={cssClasses}>
      <div className="modal-content">
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          {onClose && <button className="old-close-button" type="button" onClick={onClose}>X</button>}
          {onClose && <Button type="ghost" onClick={onClose}><Icon name="cancel" /></Button>}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
  onClose: undefined,
  title: '',
};
