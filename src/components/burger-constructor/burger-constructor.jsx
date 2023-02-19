import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, getBurgerIngredientList, removeIndgredient, swapIngredients } from '../../services/burgerIngredientListSlice';
import { getIngredientList } from '../../services/ingredientListSlice';
import { fetchPlaceOrderAsync, getOrderTotalPrice, setTotalPrice } from '../../services/orderDetailsSlice';
import { randomElementsFromArray } from '../../utils/random';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
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
    const burgerIngredientList = useSelector(getBurgerIngredientList);


    useEffect(
        () => {
            let total = 0;
            burgerIngredientList.map(item => (total += item.price));
            setOrderIngredients(burgerIngredientList)
            // хардкод булки
            dispatch(setTotalPrice(total + 400));
        },
        [dispatch, burgerIngredientList]
    );

    useEffect(
        () => {
            if (ingredientList.length > 0) {
                console.log('useEffect ingredientList');
                randomElementsFromArray(ingredientList).filter(ingredient => ingredient.type !== 'bun').map(ingredient => {
                    dispatch(addIngredient(ingredient))
                })
            }
        },
        [dispatch, ingredientList]
    );

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handlePlaceOrder = () => {
        dispatch(fetchPlaceOrderAsync(orderIngredients.map(ingredient => ingredient._id)))
            .then(() => {
                handleOpenModal()
            })
    }

    const moveElement = ({ dragIndex, hoverIndex }) => {
        dispatch(swapIngredients({ dragIndex, hoverIndex }))
    }

    const renderElement = useCallback((element, index) => {
        return (
            <ConstructorIngredient
                key={index}
                index={index}
                id={element.id}
                product={element}
                moveElement={moveElement}
                handleClose={() => handleClose(element.id)}
            />
        )
    }, [])

    const handleClose = (id) => {
        dispatch(removeIndgredient(id))
    }

    return (
        <section className={styles.container}>
            <div className={styles.orderIngredients}>
                <div className={styles.block} >
                    <div className={styles.mover}>
                    </div>
                    <ConstructorElement
                        key={'000'}
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={ingredientList[0]?.image}
                    />
                </div>
                <div
                    className={`custom_scroll ${styles.scroll}`}>
                    {burgerIngredientList?.map((product, index) =>
                        renderElement(product, index)
                    )}
                </div>
                <div className={styles.block} >
                    <div className={styles.mover}>
                    </div>
                    <ConstructorElement
                        key={'111'}
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