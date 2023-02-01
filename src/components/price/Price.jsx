
import React from 'react';
import PriceStyle from './Price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

//todo присвоить значение count для отрисовки counter
const Price = ({ price, additionalStyle }) => {

    return (
        <div className={PriceStyle.price + ' ' + additionalStyle}>
            {price}
            <CurrencyIcon type="primary" />
        </div>
    )
}

Price.propTypes = {
    price: PropTypes.number.isRequired,
};


export default Price 