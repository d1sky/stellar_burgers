import { FC } from "react";
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return (
    <div className={styles.overlay} onClick={handleClose}></div>
  );
}

export default ModalOverlay;
