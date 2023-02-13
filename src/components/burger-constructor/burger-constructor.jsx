import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useState } from 'react';
import { placeOrder } from '../../api/burger-api';
import { IngredientsContext, OrderContext, TotalPriceContext } from '../../services/appContext';
import Modal from '../modal/modal';
import OrderDetailst from '../order-details/order-details';
import Price from '../price/price';
import styles from './burger-constructor.module.css';


const BurgerConstructor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { ingredientsList } = useContext(IngredientsContext);
    const { setTotalPrice, totalPrice } = useContext(TotalPriceContext);
    const { orederDetailsDispatcher } = useContext(OrderContext);

    useEffect(
        () => {
            let total = 0;
            ingredientsList.map(item => (total += item.price));
            setTotalPrice(total);
        },
        [ingredientsList, setTotalPrice]
    );

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handlePlaceOrder = () => {
        const ingredientIdList = ingredientsList.map(ingredient => ingredient._id)

        placeOrder(ingredientIdList).then(data => {
            orederDetailsDispatcher({ type: 'add', payload: data })
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
                        thumbnail={ingredientsList[0]?.image}
                    />
                </div>
                <div
                    className={`custom_scroll ${styles.scroll}`}>
                    {ingredientsList?.map((product, index) =>
                        (index !== 0 && index !== (ingredientsList.length - 1)) &&
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
                        thumbnail={ingredientsList[0]?.image}
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