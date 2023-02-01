
import React from 'react';
import CardStyle from './Card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../price/Price'


//todo присвоить значение count для отрисовки counter
const Card = ({ card }) => {

    return (
        <div className={CardStyle.card}>
            {card.count && (
                <div className={CardStyle.counter}>
                    {card.count}
                </div>)}
            <div className={CardStyle.card_image}>
                <img src={card.image} alt='card pic' />
            </div>
            <Price price={card.price} />
            <div className={CardStyle.card_name}>
                {card.name}
            </div>
        </div>
    )
}

export default Card