import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaceOrderAsync, getOrderTotalPrice, setTotalPrice } from '../../services/orderDetailsSlice';
import { getIngredientList } from '../../services/ingredientListSlice';
import { randomElementsFromArray } from '../../utils/random';
import Modal from '../modal/modal';
import OrderDetailst from '../order-details/order-details';
import Price from '../price/price';
import styles from './burger-constructor.module.css';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderIngredients, setOrderIngredients] = useState([])
    const ingredientList = useSelector(getIngredientList);
    const totalPrice = useSelector(getOrderTotalPrice);


    useEffect(
        () => {
            let total = 0;
            orderIngredients.map(item => (total += item.price));
            // хардкод булки
            dispatch(setTotalPrice(total + 400));
        },
        [dispatch, orderIngredients]
    );

    useEffect(
        () => {
            if (ingredientList.length > 0)
                setOrderIngredients(randomElementsFromArray(ingredientList).filter(ingredient => ingredient.type !== 'bun'))
        },
        [ingredientList]
    );

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handlePlaceOrder = () => {
        dispatch(fetchPlaceOrderAsync(orderIngredients.map(ingredient => ingredient._id)))
            .then(() => {
                handleOpenModal()
            })
    }

    return (
        <section className={styles.container}>
            <div className={styles.orderIngredients}>
                <div className={styles.block} >
                    <div className={styles.mover}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={ingredientList[0]?.image}
                    />
                </div>
                <div
                    className={`custom_scroll ${styles.scroll}`}>
                    {orderIngredients?.map((product, index) =>
                        <div className={styles.block} key={index}>
                            <div className={styles.mover}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                key={product._id}
                                text={product.name}
                                price={product.price}
                                thumbnail={product.image}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.block} >
                    <div className={styles.mover}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={ingredientList[0]?.image}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <Price additionalStyle={styles.price} price={totalPrice} />
                <Button htmlType='button' onClick={handlePlaceOrder}>Оформить заказ</Button>
            </div>
            {isModalOpen &&
                <Modal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                >
                    <OrderDetailst />
                </Modal>
            }
        </section >
    );
}

export default BurgerConstructor 