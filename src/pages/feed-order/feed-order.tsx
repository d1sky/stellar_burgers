import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IngredientIcon } from '../../components/ingredient-icon/ingredient-icon';
import Price from '../../components/price/price';
import { TIngredientTypes } from '../../model/ingrediaents';
import { getIngredientList } from '../../services/ingredientListSlice';
import styles from './feed-order.module.css';

const order =
{
  "ingredients": [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733d2",
    "60d3b41abdacab0026a733d3"
  ],
  "_id": "",
  "status": "done",
  "number": 0,
  "createdAt": "2023-01-03T14:43:22.587Z",
  "updatedAt": "2021-06-23T14:43:22.603Z"
}

function datediff(first: Date, second: Date) {
  return Math.round((dateToTimeshtamp(first.toDateString()) - dateToTimeshtamp(second.toDateString())) / (60 * 60 * 24));
}

const dateToTimeshtamp = (date: string) => Math.floor(new Date(date).getTime() / 1000)

const getDate = (dateString: string) => {
  let date = new Date(dateString)
  let today = new Date()

  console.log('getDate', date, today);


  let prefix = ''
  let diff = datediff(today, date)

  switch (true) {
    case diff === 0:
      prefix = 'Сегодня,'
      break;

    case diff === 1:
      prefix = 'Вчера,'
      break;

    case diff % 10 === 1:
      prefix = diff + ' день назад,'
      break;

    case diff % 10 === 2:
    case diff % 10 === 3:
    case diff % 10 === 4:
      prefix = diff + ' дня назад,'
      break;

    case diff % 10 === 5:
    case diff % 10 === 6:
    case diff % 10 === 7:
    case diff % 10 === 8:
    case diff % 10 === 9:
    case diff % 10 === 0:
      prefix = diff + ' дней назад,'
      break;

    default:
      prefix = diff + '';
      break;
  }

  return prefix + ' ' + date.getHours() + ':' + date.getMinutes()
}


const OrderRaw: FC<{ product: TIngredientTypes }> = ({ product }) => {
  return <div className={`${styles.product}  mb-4`} >
    <div className={`${styles.productIcon} mr-4`}>
      <IngredientIcon image={product.image_mobile!} />
    </div>
    <div className={`${styles.productName} text text_type_main-default`}>{product.name}</div>
    <div className={`${styles.productPrice} text text_type_main-default`}> <Price price={product.price!} /></div>
  </div>
}


const FeedOrder: FC = () => {
  const ingredientList: Array<TIngredientTypes> = useSelector(getIngredientList);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={`${styles.number} text text_type_main-medium`}>{order.number}</div>
        <div className={`${styles.name} text text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</div>
        <div className={`${styles.status} text text_type_main-small mt-3`}>{order.status}</div>
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

export default FeedOrder;
