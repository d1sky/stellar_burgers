
import React from 'react';
import PriceStyle from './Price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

//todo присвоить значение count для отрисовки counter
const Price = ({ price, additionalStyle }) => {

    return (
        <div className={PriceStyle.price + ' ' + additionalStyle}>
            {price}
            <CurrencyIcon type="primary" />
        </div>
    )
}


export default Price 