import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientTypes } from '../../model/ingrediaents';
import Price from '../price/Price';
import BurgerConstructorStyle from './burger-constructor.module.css';

const BurgerConstructor = ({ order }) => {
    return (
        <section className={BurgerConstructorStyle.container}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={BurgerConstructorStyle.block} >
                    <div className={BurgerConstructorStyle.mover}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={order[0].image}
                    />
                </div>
                <div
                    className={`custom_scroll ${BurgerConstructorStyle.scroll}`}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {order?.map((product, index) =>
                        (index !== 0 && index !== (order.length - 1)) &&
                        <div className={BurgerConstructorStyle.block} >
                            <div className={BurgerConstructorStyle.mover}>
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
                <div className={BurgerConstructorStyle.block} >
                    <div className={BurgerConstructorStyle.mover}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={order[order.length - 1].image}
                    />
                </div>
            </div>
            <div className={BurgerConstructorStyle.bottom}>
                <Price additionalStyle={BurgerConstructorStyle.price} price={3400} />
                <Button htmlType='button'>Оформить заказ</Button>
            </div>
        </section >
    );
}


BurgerConstructor.propTypes = {
    order: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired
};

export default BurgerConstructor 