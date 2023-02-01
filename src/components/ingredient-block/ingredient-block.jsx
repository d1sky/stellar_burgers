
import PropTypes from "prop-types";
import { ingredientTypes } from '../../model/ingrediaents';
import Card from '../card/Card';
import IngredientBlockStyle from './ingredient-block.module.css';

const IngredientBlock = ({ name, ingredientList }) => {
    return (
        <div className={IngredientBlockStyle.block}>
            <div className={IngredientBlockStyle.block_title}>{name}</div>
            <div className={IngredientBlockStyle.block_container}>
                {ingredientList.map((ingredient, index) =>
                    <Card
                        key={index}
                        ingredient={ingredient} />)}
            </div>
        </div>
    );
}

IngredientBlock.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
    name: PropTypes.string.isRequired
};


export default IngredientBlock 