
import Price from '../price/Price';
import CardStyle from './Card.module.css';
import { ingredientTypes } from '../../model/ingrediaents'

const Card = ({ ingredient }) => {

    return (
        <div className={CardStyle.card}>
            {ingredient.count && (
                <div className={CardStyle.counter}>
                    {ingredient.count}
                </div>)}
            <div className={CardStyle.card_image}>
                <img src={ingredient.image} alt='card pic' />
            </div>
            <Price price={ingredient.price} />
            <div className={CardStyle.card_name}>
                {ingredient.name}
            </div>
        </div>
    )
}

Card.propTypes = {
    ingredient: ingredientTypes.isRequired,
};


export default Card