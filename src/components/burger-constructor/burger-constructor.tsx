import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from "../../services";
import { TIngredientTypes } from '../../model/ingrediaents';
import { LOGIN_ROUTE } from '../../route';
import { getUser } from '../../services/authSlice';
import { getBurgerIngredientList, removeIndgredient, resetIndgredient, swapIngredients } from '../../services/burgerIngredientListSlice';
import { fetchPlaceOrderAsync, getOrderDetailsStatus, getOrderTotalPrice, setTotalPrice } from '../../services/orderDetailsSlice';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import OrderDetailst from '../order-details/order-details';
import Price from '../price/price';
import styles from './burger-constructor.module.css';


const BurgerConstructor: FC = () => {
    const user = useSelector(getUser)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const totalPrice = useSelector(getOrderTotalPrice);
    const orderStatus = useSelector(getOrderDetailsStatus);
    const burgerIngredientList: Array<TIngredientTypes> = useSelector(getBurgerIngredientList);
    const [bun, setBun] = useState<TIngredientTypes | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const [, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: () => ({ name: 'Dustbin' }),
    }))

    useEffect(
        () => {
            let total = 0;
            burgerIngredientList.map(({ type, price }) =>
                (total += price!));
            dispatch(setTotalPrice(total));
        },
        [dispatch, burgerIngredientList]
    );

    useEffect(
        () => {
            if (burgerIngredientList.filter(ingredient => ingredient.type === 'bun').length > 0) {
                setBun(burgerIngredientList.filter((ingredient: TIngredientTypes) => ingredient?.type === 'bun')[0])
            }
        },
        [burgerIngredientList]
    );

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handlePlaceOrder = () => {
        if (user.email) {
            dispatch(fetchPlaceOrderAsync(burgerIngredientList.map(ingredient => ingredient._id!)))
                .then(() => {
                    handleOpenModal()
                    dispatch(resetIndgredient())
                    setBun(null)
                })
        } else {
            navigate(LOGIN_ROUTE)
        }

    }

    const moveElement = ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number; }) => {
        dispatch(swapIngredients({ dragIndex, hoverIndex }))
    }

    type TRenderElementCallback = (element: TIngredientTypes, index: number) => ReactNode;

    const renderElement = useCallback<TRenderElementCallback>((element, index) => {
        return (
            <ConstructorIngredient
                key={element.id}
                index={index}
                product={element}
                moveElement={moveElement}
                handleClose={() => handleClose(element)}
            />
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = (element: TIngredientTypes) => {
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
                            text={bun.name + ' (верх)'}
                            price={bun.price!}
                            thumbnail={bun.image!}
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
                            text={bun.name + ' (низ)'}
                            price={bun.price!}
                            thumbnail={bun.image!}
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
                <Price price={totalPrice} />
                {bun && <Button htmlType='button' onClick={handlePlaceOrder}>Оформить заказ</Button>}
            </div>
            {isModalOpen &&
                <Modal
                    handleClose={handleCloseModal}
                >
                    <OrderDetailst />
                </Modal>
            }
            {orderStatus === 'loading' && <Loader />}
        </section >
    );
}

export default BurgerConstructor 