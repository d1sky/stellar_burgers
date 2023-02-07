
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as Vector1 } from '../../images/Vector1.svg';
import { ReactComponent as Vector2 } from '../../images/Vector2.svg';
import { ReactComponent as Vector3 } from '../../images/Vector3.svg';
import styles from './order-details.module.css';


function OrderDetails() {

  return (
    <div className={`${styles.modal}`}>
      <p className={`text text_type_digits-large text_color_primary mt-30 ${styles.id}`}>034536</p>
      <p className={`text  text_type_main-medium mt-8 ${styles.title}`}>идентификатор заказа</p>
      <p className={`text  text_type_main-default mt-15 ${styles.icon}`}>
        <div className={`${styles.check}`}><CheckMarkIcon type='primary' /></div>
        <Vector1 className={`${styles.vector1}`} />
        <Vector2 className={`${styles.vector2}`} />
        <Vector3 className={`${styles.vector3}`} />
      </p>
      <p className={`text  text_type_main-default mt-15 ${styles.status}`}>Ваш заказ начали готовить</p>
      <p className={`text  text_type_main-default mt-2 text_color_inactive ${styles.info}`}>Дождитесь готовности на орбитальной станции</p>

    </div>
  );
}

export default OrderDetails;
