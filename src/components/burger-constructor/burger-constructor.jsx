import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngredientList, removeIndgredient, swapIngredients } from '../../services/burgerIngredientListSlice';
import { fetchPlaceOrderAsync, getOrderTotalPrice, setTotalPrice } from '../../services/orderDetailsSlice';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import Modal from '../modal/modal';
import OrderDetailst from '../order-details/order-details';
import Price from '../price/price';
import styles from './burger-constructor.module.css';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const totalPrice = useSelector(getOrderTotalPrice);
    const burgerIngredientList = useSelector(getBurgerIngredientList);
    const [bun, setBun] = useState()

    const [, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: () => ({ name: 'Dustbin' }),
    }))

    useEffect(
        () => {
            let total = 0;
            burgerIngredientList.map(({ type, price }) =>
                (total += price));
            dispatch(setTotalPrice(total));
        },
        [dispatch, burgerIngredientList]
    );

    useEffect(
        () => {
            if (burgerIngredientList.filter(ingredient => ingredient.type === 'bun').length > 0) {
                setBun(burgerIngredientList.filter(ingredient => ingredient.type === 'bun')[0])
            }
        },
        [burgerIngredientList]
    );

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handlePlaceOrder = () => {
        dispatch(fetchPlaceOrderAsync(burgerIngredientList.map(ingredient => ingredient._id)))
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
                handleClose={() => handleClose(element)}
            />
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = (element) => {
        dispatch(removeIndgredient(element))
    }

    return (
        <section className={styles.container} ref={drop}>
            {burgerIngredientList.length > 0 ?
                <div className={styles.orderIngredients} >
                    {bun && <div className={styles.block} >
                        <div className={styles.mover}>
                        </div>
                        <ConstructorElement
                            key={'top'}
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                    }
                    <div
                        className={`custom_scroll ${styles.scroll}`}>
                        {burgerIngredientList.map((product, index) => {
                            if (product.type !== 'bun')
                                return renderElement(product, index)
                            return null
                        }
                        )}
                    </div>
                    {bun && <div className={styles.block} >
                        <div className={styles.mover}>
                        </div>
                        <ConstructorElement
                            key={'bottom'}
                            type="bottom"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                    }
                </div>
                :
                <>
                    <h2>Конструктор</h2>
                    Начните добавлять ингредиенты в конструктор, перетаскивая в правую часть и не забывайте про булку!
                </>
            }

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