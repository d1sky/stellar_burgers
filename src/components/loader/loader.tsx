
import { FC } from 'react';
import { createPortal } from 'react-dom';
import RingLoader from "react-spinners/RingLoader";
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './loader.module.css';


const Loader: FC = () => {
  return createPortal(
    <div className={`${styles.loader}`}>
      <RingLoader color={'#fff'} />
      <ModalOverlay handleClose={() => { }} />
    </div >
    , document.getElementById('modal')!)
}

export default Loader;
