import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderBlock from '../../components/order-block/order-block';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TOrder } from '../../model/types';
import { FEED_ROUTE } from '../../route';
import { closeConnection, getAllOrders, getTotal, getTotalToday, startConnecting } from '../../services/order-feed';
import styles from './feed.module.css';


const Feed: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  useEffect(
    () => {
      dispatch(startConnecting());

      return () => { dispatch(closeConnection()) }
    }, [dispatch]
  );

  if (!orders) return <></>

  return (
    <div className={styles.container}>
      <div className={`text text_type_main-large mb-5`}>
        Лента заказов
      </div>
      <div className={`${styles.block} mt-6`}>
        <div className={`${styles.orders}`}>
          {orders?.map((order: TOrder) =>
            <Link className={styles.orderLink} key={order._id} to={FEED_ROUTE + '/' + order.number} state={{ background: location }}>
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
                <li>034533</li>
                <li>034531</li>
                <li>034532</li>
                <li>034530</li>
                <li>034534</li>
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
            <p className="text text_type_digits-large">{total}</p>
          </div>

          <div className="todayOrders mt-15">
            <p className={`text text_type_main-medium pb-1`}>Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;