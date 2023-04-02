
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './price.module.css';


const Price: FC<{ price: number; }> = ({ price }) => {
    return (
        <div className={styles.price}>
            {price}
            <CurrencyIcon type="primary" />
        </div>
    )
}

export default Price 
