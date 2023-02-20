
import Price from '../price/price';
import styles from './card.module.css';
import { ingredientTypes } from '../../model/ingrediaents'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { addIngredient } from '../../services/burgerIngredientListSlice';
import { increment } from '../../services/ingredientListSlice';


const Card = ({ ingredient, onClick }) => {
    const dispatch = useDispatch();
    const [, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { ...ingredient },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                dispatch(addIngredient(item))
                dispatch(increment({ id: item._id }))
            }
        },
    }))

    return (
        <div ref={drag} className={styles.card} onClick={() => onClick(ingredient)}>
            {ingredient.count > 0 && (
                <Counter count={ingredient?.count} size="default" extraClass="m-1" />)}
            <div className={styles.card_image}>
                <img src={ingredient?.image} alt={ingredient?.name} />
            </div>
            <Price price={ingredient?.price} />
            <div className={styles.card_name}>
                {ingredient?.name}
            </div>
        </div>
    )
}

Card.propTypes = {
    ingredient: ingredientTypes.isRequired,
    onClick: PropTypes.func
};


export default Card
