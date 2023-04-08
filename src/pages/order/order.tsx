import { FC } from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';

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


const Order: FC = () => {
  let { id } = useParams();

  console.log(id);
  

  return (
    <OrderInfo order={order} />
  );
}

export default Order;
