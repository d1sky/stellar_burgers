
import { createPortal } from 'react-dom';
import RingLoader from "react-spinners/RingLoader";
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './loader.module.css';


const modalRoot = document.getElementById('modal');

const Loader = () => {
  return createPortal(
    <div className={`${styles.loader}`}>
      <RingLoader color={'#fff'} />
      <ModalOverlay handleClose={() => { }} />
    </div >
    , modalRoot)
}

export default Loader;
