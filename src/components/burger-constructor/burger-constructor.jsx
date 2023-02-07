import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useState } from 'react';
import { ingredientTypes } from '../../model/ingrediaents';
import Modal from '../modal/modal';
import OrderDetailst from '../order-details/order-details';
import Price from '../price/price';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ order }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <section className={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={styles.block} >
                    <div className={styles.mover}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={order[0]?.image}
                    />
                </div>
                <div
                    className={`custom_scroll ${styles.scroll}`}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {order?.map((product, index) =>
                        (index !== 0 && index !== (order.length - 1)) &&
                        <div className={styles.block} key={index}>
                            <div className={styles.mover}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                key={index}
                                text={product.name}
                                price={50}
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
                        thumbnail={order[0]?.image}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <Price additionalStyle={styles.price} price={3400} />
                <Button htmlType='button' onClick={handleOpenModal}>Оформить заказ</Button>
            </div>
            <Modal
                open={isModalOpen}
                handleClose={handleCloseModal}
                children={<OrderDetailst ingredientsList />} />
        </section >
    );
}


BurgerConstructor.propTypes = {
    order: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired
};

export default BurgerConstructor 