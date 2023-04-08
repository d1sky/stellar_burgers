import { FC, Key } from 'react';
import { Link } from 'react-router-dom';
import OrderBlock from '../../components/order-block/order-block';
import { FEED_ROUTE } from '../../route';
import styles from './feed.module.css';
import { useGetOrdersQuery } from '../../services/orders';
import { TOrder } from '../../model/types';


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

const Feed: FC = () => {

  const { data } = useGetOrdersQuery(0);

  console.log('useGetOrdersQuery', data);


  // getOrders;

  // let arr = getOrders();

  if (!data) return <></>

  return (
    <div className={styles.container}>
      <div className={`text text_type_main-large mb-5`}>
        Лента заказов
      </div>
      <div className={`${styles.block} mt-6`}>
        <div className={`${styles.orders}`}>
          {data[0]?.orders?.map((order: TOrder) =>
            <Link className={styles.orderLink} key={order._id} to={FEED_ROUTE + '/' + order._id}>
              <div className={styles.orderContaier}>
              <OrderBlock order={order} />
              </div>
             
            </Link>)}
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.orderList}`}>
            <div className={`${styles.readyOrders}`}>
              <p className={`text text_type_main-medium pb-6`}>Готовы:</p>
              <ul className={`${styles.readyOrdersList} text text_type_digits-default`}>
                <li>034533</li>
                <li>034531</li>
                <li>034532</li>
                <li>034530</li>
                <li>034534</li>
              </ul>
            </div>
            <div className={`${styles.inWork} `}>
              <p className={`text text_type_main-medium pb-6`}>В работе:</p>
              <ul className={`${styles.inWorkList} text text_type_digits-default`}>
                <li>034533</li>
                <li>034531</li>
                <li>034532</li>
              </ul>
            </div>
          </div>

          <div className="allOrders mt-15">
            <p className={`text text_type_main-medium pb-1`}>Выполнено за все время:</p>
            <p className="text text_type_digits-large">{data[0]?.total}</p>
          </div>

          <div className="todayOrders mt-15">
            <p className={`text text_type_main-medium pb-1`}>Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{data[0]?.totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
