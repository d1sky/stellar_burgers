
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '../../hooks/hooks';
import { TIngredientTypes } from '../../model/ingrediaents';
import { addIngredient } from '../../services/burgerIngredientListSlice';
import Price from '../price/price';
import styles from './card.module.css';


const Card: FC<{ ingredient: TIngredientTypes; onClick: Function }> = ({ ingredient, onClick }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { ...ingredient },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                dispatch(addIngredient(item))
            }
        },
    }))

    return (
        <div
            ref={drag}
            className={styles.card}
            onClick={() => onClick(ingredient)}
        >
            <Link to={`/ingredients/${ingredient._id}`}
                state={{ background: location }}
            >
                {ingredient.count! > 0 && (
                    <Counter count={ingredient?.count!} size="default" extraClass="m-1" />)}
                <div className={styles.card_image}>
                    <img src={ingredient?.image} alt={ingredient?.name} />
                </div>
                <Price price={ingredient?.price!} />
                <div className={styles.card_name}>
                    {ingredient?.name}
                </div>
            </Link>
        </div >


    )
}


export default Card
