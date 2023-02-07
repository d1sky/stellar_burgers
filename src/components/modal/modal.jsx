
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

const Modal = ({ title, children, open, handleClose }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleClose, false);
  }, [handleClose])

  return createPortal(
    < div className={`${styles.modal} ${open && styles.open}`}>
      <div className={`${styles.container}`}>
        <div className={`ml-10 mt-10 mr-10 ${styles.header}`}>
          <div className={`text text_type_main-large text_color_primary  ${styles.title}`}>{title}</div>
          <div
            className={`${styles.closeButton}`}
            onClick={handleClose}
          >
            <CloseIcon type='primary' />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </div >
    , modalRoot)
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;
