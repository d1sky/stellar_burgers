
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

const Modal = ({ title, children, open, handleClose }) => {

  useEffect(() => {
    const handleESCclose = (key) => key.keyCode === 27 && handleClose();
    document.addEventListener("keydown", handleESCclose);

    return () => document.removeEventListener("keydown", handleESCclose);
  }, [handleClose])

  return createPortal(
    < div className={`${styles.modal} ${open && styles.open}`}>
      <div className={`${styles.container}`}>
        <div className={` mt-10 ${styles.header}`}>
          <div className={`ml-10 text text_type_main-large text_color_primary  ${styles.title}`}>{title}</div>
          <div
            className={`mr-10  ${styles.closeButton}`}
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
