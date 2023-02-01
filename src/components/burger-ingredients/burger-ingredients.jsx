
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useState } from 'react';
import { ingredientTypes } from '../../model/ingrediaents';
import IngredientBlock from '../ingredient-block/ingredient-block';
import BurgerIngredientsStyle from './burger-ingredients.module.css';

const ingredientsCategoryList = [
    {
        name: 'Булки',
        type: 'bun'
    },
    {
        name: 'Соусы',
        type: 'sauce'
    },
    {
        name: 'Начинки',
        type: 'main'
    }
]



const BurgerIngredients = ({ ingredientsList }) => {
    const [current, setCurrent] = useState(ingredientsCategoryList[0].name);

    return (
        <section className={BurgerIngredientsStyle.container}>
            <div className={BurgerIngredientsStyle.title}>
                Соберите бургер
            </div>
            <div style={{ display: 'flex' }}>
                {ingredientsCategoryList.map(ingredient =>
                    <Tab
                        value={ingredient.name}
                        key={ingredient.type}
                        active={current === ingredient.name}
                        onClick={setCurrent} >
                        {ingredient.name}
                    </Tab>
                )}
            </div>
            <div className={BurgerIngredientsStyle.box + ' custom_scroll'}>
                {ingredientsCategoryList.map(category =>
                    <IngredientBlock
                        key={category.type}
                        name={category.name}
                        ingredientList={ingredientsList.filter(ingredient =>
                            ingredient.type === category.type)} />
                )}
            </div>
        </section>
    );
}


BurgerIngredients.propTypes = {
    ingredientsList: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired
};

export default BurgerIngredients 