
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import styles from './price.module.css';

const Price = ({ price, additionalStyle }) => {
    return (
        <div className={styles.price + ' ' + additionalStyle}>
            {price}
            <CurrencyIcon type="primary" />
        </div>
    )
}

Price.propTypes = {
    price: PropTypes.number.isRequired,
};


export default Price 