
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { ingredientTypes } from '../../model/ingrediaents';
import Card from '../card/card';
import styles from './ingredient-block.module.css';


const IngredientBlock = forwardRef((props, ref) => {
    const { name, ingredientList, handleIngredientClick } = props;

    return (
        <div className={styles.block}>
            <h2 className={styles.block_title} ref={ref}>{name}</h2>
            <div className={styles.block_container}>
                {ingredientList.map((ingredient) =>
                    <Card
                        onClick={handleIngredientClick}
                        key={ingredient._id}
                        ingredient={ingredient} />)}
            </div>
        </div>
    );
})

IngredientBlock.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    handleIngredientClick: PropTypes.func
};


export default IngredientBlock 