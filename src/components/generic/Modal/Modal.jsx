import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Modal as MomentumModal, ModalBody, ModalHeader} from '@momentum-ui/react';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../../constants';

/**
 * Modal component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.applicationId]  Application DOM id
 * @param {React.ReactNode[]} props.children  List of children
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {Function} [props.onClose]  Callback when the modal is closed
 * @param {string} [props.title]  Title of the modal
 *
 * @returns {object}  JSX of the element
 */
export default function Modal({
  applicationId,
  children,
  className,
  onClose,
  title,
  ...props
}) {
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-modal`]: true,
    [className]: !!className,
  };
  const testId = `${WEBEX_COMPONENTS_CLASS_PREFIX}-${Math.random().toString().slice(2)}`;

  return (
    <MomentumModal
      applicationId={applicationId}
      className={classNames(mainClasses)}
      htmlId={testId}
      onHide={onClose}
      show
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <ModalHeader headerLabel={title} showCloseButton={!!onClose} />
      <ModalBody>
        {children}
      </ModalBody>
    </MomentumModal>
  );
}

Modal.propTypes = {
  applicationId: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

Modal.defaultProps = {
  applicationId: 'app',
  className: '',
  onClose: undefined,
  title: '',
};
