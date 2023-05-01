
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { ReactComponent as Vector1 } from '../../images/Vector1.svg';
import { ReactComponent as Vector2 } from '../../images/Vector2.svg';
import { ReactComponent as Vector3 } from '../../images/Vector3.svg';
import { getOrderDetailsList } from '../../services/slices/order-details/orderDetailsSlice';
import styles from './order-details.module.css';
import { useSelector } from '../../hooks/hooks';

const OrderDetails: FC = () => {
  const orderDetails = useSelector(getOrderDetailsList);

  return (
    <div className={`mt-4 mb-30 ${styles.modal}`}>
      <p className={`text text_type_digits-large text_color_primary ${styles.id}`}>{orderDetails?.number}</p>
      <p className={`text  text_type_main-medium mt-8 ${styles.title}`}>идентификатор заказа</p>
      <div className={`text  text_type_main-default mt-15 ${styles.icon}`}>
        <div className={`${styles.check}`}><CheckMarkIcon type='primary' /></div>
        <Vector1 className={`${styles.vector1}`} />
        <Vector2 className={`${styles.vector2}`} />
        <Vector3 className={`${styles.vector3}`} />
      </div>
      <p className={`text  text_type_main-default mt-15 ${styles.status}`}>Ваш заказ начали готовить</p>
      <p className={`text  text_type_main-default mt-2 text_color_inactive ${styles.info}`}>Дождитесь готовности на орбитальной станции</p>

    </div>
  );
}


export default OrderDetails;
