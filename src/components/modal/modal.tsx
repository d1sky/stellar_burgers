
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const ESC_KEY = 'Escape';

const modalRoot = document.getElementById('modal');

type TModal = {
  title?: string;
  children: ReactElement;
  handleClose: () => void;
}

const Modal: FC<TModal> = ({ title, children, handleClose }) => {

  useEffect(() => {
    const handleESCclose = (event: KeyboardEvent) => event.key === ESC_KEY && handleClose();
    document.addEventListener("keydown", handleESCclose);

    return () => document.removeEventListener("keydown", handleESCclose);
  }, [handleClose])

  return createPortal(
    < div className={`${styles.modal}`}>
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
    , modalRoot!)
}

export default Modal;
