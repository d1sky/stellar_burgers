
import { FC } from 'react';
import styles from './ingredient-icon.module.css';

export const IngredientIcon: FC<{ image: string }> = ({ image }) => {
    return (
        <div className={styles.icon}>
            <div className={styles.back}>
                <img className={styles.image} src={image} alt="" />
            </div>
        </div>
    )
}