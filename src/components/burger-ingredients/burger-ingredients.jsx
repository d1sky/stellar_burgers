
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useState } from 'react';
import { ingredientTypes } from '../../model/ingrediaents';
import IngredientBlock from '../ingredient-block/ingredient-block';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';

const CATEGORY_LIST = [
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
    const [current, setCurrent] = useState(CATEGORY_LIST[0].name);
    const [ingredient, setIngredient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleIngredientClick = (ingredient) => {
        setIngredient(ingredient)
        handleOpenModal()
    }

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                Соберите бургер
            </div>
            <div className={styles.tabs}>
                {CATEGORY_LIST.map(ingredient =>
                    <Tab
                        value={ingredient.name}
                        key={ingredient.type}
                        active={current === ingredient.name}
                        onClick={setCurrent} >
                        {ingredient.name}
                    </Tab>
                )}
            </div>
            <div className={styles.box + ' custom_scroll'}>
                {CATEGORY_LIST.map(category =>
                    <IngredientBlock
                        key={category.type}
                        name={category.name}
                        handleIngredientClick={handleIngredientClick}
                        ingredientList={ingredientsList.filter(ingredient =>
                            ingredient.type === category.type)} />
                )}
            </div>
            {isModalOpen &&
                <Modal
                    title={'Детали ингридиента'}
                    handleClose={handleCloseModal}
                >
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            }

        </section>
    );
}


BurgerIngredients.propTypes = {
    ingredientsList: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired
};

export default BurgerIngredients 