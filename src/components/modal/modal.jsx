
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';


const Modal = ({ children, open, handleClose }) => {

  return (
    <div className={`${styles.modal} ${open && styles.open}`}>
      <div className={`${styles.container}`}>
        <div
          className={`${styles.closeButton}`}
          onClick={handleClose}
        >
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </div>
  );
}

export default Modal;
