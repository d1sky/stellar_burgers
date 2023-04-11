import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IngredientIcon } from '../../components/ingredient-icon/ingredient-icon';
import Price from '../../components/price/price';
import { TIngredientTypes } from '../../model/ingrediaents';
import { TOrder } from '../../model/types';
import { getIngredientList } from '../../services/ingredientListSlice';
import { getDate } from '../../utils/date';
import { getCirilicStatus } from '../../utils/order-status';
import styles from './order-info.module.css';
import { fetchGetOrderAsync, getOrderInfo } from '../../services/orderInfoSlice';
import { AppDispatch } from '../../services';
import { useParams } from 'react-router-dom';


const OrderRaw: FC<{ product: TIngredientTypes }> = ({ product }) => {
    return <div className={`${styles.product}  mb-4`} >
        <div className={`${styles.productIcon} mr-4`}>
            <IngredientIcon image={product.image_mobile!} />
        </div>
        <div className={`${styles.productName} text text_type_main-default`}>{product.name}</div>
        <div className={`${styles.productPrice} text text_type_main-default`}> <Price price={product.price!} /></div>
    </div>
}

const OrderInfo: FC = () => {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const ingredientList: Array<TIngredientTypes> = useSelector(getIngredientList);
    const order = useSelector(getOrderInfo);

    console.log('OrderInfo', order);


    useEffect(() => {
        dispatch(fetchGetOrderAsync(id!))
    }, [])

    if (!order) {
        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <div className={`${styles.number} text text_type_main-medium`}>{order.number}</div>
                <div className={`${styles.name} text text_type_main-medium mt-10`}>{order.name}</div>
                <div className={`${styles.status} text text_type_main-small mt-3`}>{getCirilicStatus(order.status)}</div>
                <div className={`${styles.compositionTitle} text text_type_main-medium mt-15`}>Состав:</div>
                <div className={`${styles.productList}  mt-6`} >
                    {order.ingredients.map((ingredient, id) => <OrderRaw key={id} product={ingredientList.find(item => item._id === ingredient)!} />)}
                </div>
                <div className={`${styles.bottom} mt-10`}>
                    <div className={`${styles.date} text text_type_main-small`}>
                        {getDate(order.createdAt)}
                    </div>
                    <div className={`${styles.price}`}><Price price={510} /></div>
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;
