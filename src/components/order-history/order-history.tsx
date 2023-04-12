import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TOrder } from '../../model/types';
import { PROFILE_ORDERS_ROUTE } from '../../route';
import { closeConnection, getAllOrders, startConnecting } from '../../services/order-history';
import OrderBlock from '../order-block/order-block';
import styles from './order-history.module.css';


const OrderHistory: FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector(getAllOrders);

    useEffect(
        () => {
            dispatch(startConnecting());

            return () => { dispatch(closeConnection()) }
        }, [dispatch]
    );

    if (!orders) return <></>

    return (
        <div className={styles.container}>
            {orders?.map((order: TOrder) =>
                <Link className={styles.orderLink} key={order._id} to={PROFILE_ORDERS_ROUTE + '/' + order.number}>
                    <div className={styles.orderContaier}>
                        <OrderBlock order={order} />
                    </div>
                </Link>
            )}
        </div>
    )
}

export default OrderHistory 
