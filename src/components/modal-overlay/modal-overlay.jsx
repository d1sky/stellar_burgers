
import { useEffect } from 'react';
import styles from './modal-overlay.module.css';

function ModalOverlay({ handleClose }) {
  useEffect(() => {
    document.addEventListener("keydown", handleClose, false);
  }, [handleClose])

  return (
    <div className={styles.overlay} onClick={handleClose}></div>
  );
}

export default ModalOverlay;
