
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/Ingredient';
import Price from '../price/Price';
import BurgerConstructorStyle from './BurgerConstructorStyle.module.css';

const BurgerConstructor = ({ order }) => {
    return (
        <section className={BurgerConstructorStyle.container}>
            <Ingredient
                key={0}
                order={order[0]}
                top
            />
            {/* 464 */}
            <div className={BurgerConstructorStyle.scroll + ' custom_scroll'}>
                {order.map((it, index) => {
                    if (index !== 0 && index !== (order.length - 1)) {
                        return <Ingredient
                            key={index}
                            order={it} />
                    }
                })}
            </div>
            <Ingredient
                key={order.length - 1}
                order={order[order.length - 1]}
                bottom
            />
            <div className={BurgerConstructorStyle.bottom}>
                <Price additionalStyle={BurgerConstructorStyle.price} price={3400} />
                <Button> Оформить заказ</Button>
            </div>
        </section>
    );
}

export default BurgerConstructor 