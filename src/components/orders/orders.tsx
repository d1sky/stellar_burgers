
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FEED_ROUTE, PROFILE_ORDERS_ROUTE } from '../../route';
import OrderBlock from '../order-block/order-block';
import styles from './orders.module.css';

const orders_response = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733d2",
                "60d3b41abdacab0026a733d3"
            ],
            "_id": "1",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
}

const Orders: FC = () => {
    return (
        <div className={styles.container}>
            {orders_response.orders.map((order) => <Link className={styles.orderLink} key={order._id} to={PROFILE_ORDERS_ROUTE + '/' + order._id}><OrderBlock order={orders_response.orders[0]} /></Link>)}
        </div>
    )
}

export default Orders 
