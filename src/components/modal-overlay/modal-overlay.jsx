import PropTypes from "prop-types";
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ handleClose }) => {
  return (
    <div className={styles.overlay} onClick={handleClose}></div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
};


export default ModalOverlay;
