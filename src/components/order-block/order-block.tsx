
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TIngredientTypes } from '../../model/ingrediaents';
import { TOrder } from '../../model/types';
import { getIngredientList } from '../../services/ingredientListSlice';
import { getDate } from '../../utils/date';
import { getCirilicStatus } from '../../utils/order-status';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';
import styles from './order-block.module.css';


const OrderBlock: FC<{ order: TOrder }> = ({ order }) => {
    const ingredientList: Array<TIngredientTypes> = useSelector(getIngredientList);


    return (
        <div className={`${styles.container} p-6`}>
            <div className={`${styles.header} text text_type_main-medium`}>
                <div className={`${styles.number} text text_type_main-medium`}>
                    {order.number}
                </div>
                <div className={`${styles.date} text text_type_main-small`}>
                    {getDate(order.updatedAt)}
                </div>
            </div>
            <div className={`${styles.name} text text_type_main-medium mt-6`}>
                {order.name}
            </div>
            <div className={`${styles.status} text text_type_main-small mt-2`}>
                {getCirilicStatus(order.status)}
            </div>
            <div className={`${styles.details}  mt-6`}>
                <ul className={`${styles.ingredients} text text_type_main-small`}>
                    {order.ingredients.slice().reverse().map((ingredient, id) =>
                        <li key={id} className={`${styles.icon}`}>
                            <IngredientIcon image={ingredientList.find(item => item._id === ingredient)?.image_mobile!} />
                        </li>
                    )}
                </ul>
                <div className={`${styles.price}`}>
                    <Price price={order.ingredients.reduce((p,n) => p + ingredientList.find(ingredient => ingredient._id === n)?.price!, 0)} />
                </div>
            </div>
        </div>
    )
}

export default OrderBlock 
