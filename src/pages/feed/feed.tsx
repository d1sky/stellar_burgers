import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import OrderBlock from '../../components/order-block/order-block';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TOrder } from '../../model/types';
import { FEED_ROUTE } from '../../route';
import { closeConnection, getAllOrders, getTotal, getTotalToday, startConnecting } from '../../services/orders';
import styles from './feed.module.css';


const Feed: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);


  useEffect(() => {
    dispatch(startConnecting('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(closeConnection());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!orders) return <></>

  return (
    <div className={styles.container}>
      <div className={`text text_type_main-large mb-5`}>
        Лента заказов
      </div>
      {orders.length > 0 ? (
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
                  {orders?.filter(order => order.status === 'done').slice(0, 20).map(order => <li key={order.number}>{order.number}</li>)}
                </ul>
              </div>
              <div className={`${styles.inWork} `}>
                <p className={`text text_type_main-medium pb-6`}>В работе:</p>
                <ul className={`${styles.inWorkList} text text_type_digits-default`}>
                  {orders?.filter(order => order.status === 'pending').slice(0, 20).map(order => <li key={order.number}>{order.number}</li>)}
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
        </div>) : <Loader />}
    </div>
  );
}

export default Feed;
