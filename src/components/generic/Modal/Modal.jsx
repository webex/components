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
 * @param {Function} [props.onBack]  Callback when the modal back button is triggerd
 * @param {Function} [props.onClose]  Callback when the modal is closed
 * @param {string} [props.otherClassName]  Custom other CSS class to apply
 * @param {string} [props.title]  Title of the modal
 *
 * @returns {object}  JSX of the element
 */
export default function Modal({
  children,
  className,
  onBack,
  onClose,
  otherClassName,
  title,
}) {
  const [ref, {width}] = useElementDimensions();
  const [cssClasses, sc] = webexComponentClasses('modal', className, {
    'centered-modal': width > TABLET,
  });

  return (
    <div ref={ref} className={cssClasses}>
      <div className={`${sc('content')} ${otherClassName}`}>
        <div className={sc('header')}>
          {onBack && <Button type="ghost" className={sc('back')} onClick={onBack}><Icon name="arrow-left" size="13" /></Button>}
          {title && <h3 className={sc('title')}>{title}</h3>}
          {onClose && <Button className={sc('close')} type="ghost" onClick={onClose}><Icon name="cancel" size={16} /></Button>}
        </div>
        <div className={sc('body')}>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  otherClassName: PropTypes.string,
  title: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
  onBack: undefined,
  onClose: undefined,
  otherClassName: undefined,
  title: '',
};
