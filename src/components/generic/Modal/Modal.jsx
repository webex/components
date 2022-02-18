import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {TABLET} from '../../breakpoints';
import {useElementDimensions, useRef} from '../../hooks';

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
 * @param {string} [props.ariaLabel]  Aria label for the modal
 * @returns {object}  JSX of the element
 */
export default function Modal({
  children,
  className,
  onBack,
  onClose,
  otherClassName,
  title,
  ariaLabel,
}) {
  const ref = useRef();
  const {width} = useElementDimensions(ref);
  const [cssClasses, sc] = webexComponentClasses('modal', className, {
    'centered-modal': width > TABLET,
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div ref={ref} className={cssClasses} onKeyDown={handleKeyDown} role="dialog" aria-label={ariaLabel || title}>
      <div className={`${sc('content')} ${otherClassName}`}>
        <div className={sc('header')}>
          {onBack && (
            <Button
              tabIndex={198}
              type="ghost"
              className={sc('back')}
              size={28}
              onClick={onBack}
              ariaLabel="Return to the previous screen"
            >
              <Icon name="arrow-left" size="13" />
            </Button>
          )}
          {title && <h3 className={sc('title')}>{title}</h3>}
          {onClose && (
          <Button
            tabIndex={199}
            className={sc('close')}
            type="ghost"
            size={28}
            ariaLabel="Close dialog"
            onClick={onClose}
          >
            <Icon name="cancel" size={16} />
          </Button>
          )}
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
  ariaLabel: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
  onBack: undefined,
  onClose: undefined,
  otherClassName: undefined,
  title: '',
  ariaLabel: undefined,
};
