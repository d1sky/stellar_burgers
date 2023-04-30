
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './price.module.css';


const Price: FC<{ price: number | null; count?: number | undefined; }> = ({ price = '', count }) => {
    return (
        <div className={`${styles.price} text text_type_digits-default`}>
            {count! &&
                <>
                    <div>{count!}</div>
                    <div className={styles.sign}> x </div>
                </>
            }
            <div>{price!}</div>
            <CurrencyIcon type="primary" />
        </div>
    )
}

export default Price 
