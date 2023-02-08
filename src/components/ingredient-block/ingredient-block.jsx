
import PropTypes from "prop-types";
import { ingredientTypes } from '../../model/ingrediaents';
import Card from '../card/card';
import styles from './ingredient-block.module.css';


const IngredientBlock = ({ name, ingredientList, handleIngredientClick }) => {
    return (
        <div className={styles.block}>
            <h2 className={styles.block_title}>{name}</h2>
            <div className={styles.block_container}>
                {ingredientList.map((ingredient, index) =>
                    <Card
                        onClick={handleIngredientClick}
                        key={index}
                        ingredient={ingredient} />)}
            </div>
        </div>
    );
}

IngredientBlock.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    handleIngredientClick: PropTypes.func
};


export default IngredientBlock 