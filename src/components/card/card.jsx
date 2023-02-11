
import Price from '../price/price';
import styles from './card.module.css';
import { ingredientTypes } from '../../model/ingrediaents'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";


const Card = ({ ingredient, onClick }) => {
    return (
        <div className={styles.card} onClick={() => onClick(ingredient)}>
            {ingredient.count && (
                <Counter count={ingredient.count} size="default" extraClass="m-1" />)}
            <div className={styles.card_image}>
                <img src={ingredient.image} alt='card pic' />
            </div>
            <Price price={ingredient.price} />
            <div className={styles.card_name}>
                {ingredient.name}
            </div>
        </div>
    )
}

Card.propTypes = {
    ingredient: ingredientTypes.isRequired,
    onClick: PropTypes.func
};


export default Card
