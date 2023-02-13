import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IngredientsContext } from '../../services/appContext';
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

const options = {
    behavior: "smooth",
    block: "start",
}


const BurgerIngredients = () => {
    const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
    const [ingredient, setIngredient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { ingredientsList } = useContext(IngredientsContext);

    const buneSetRef = useRef(null);
    const sauceSetRef = useRef(null);
    const mainSetRef = useRef(null);

    const bunIngredientsList = useMemo(() => ingredientsList.filter(ingredient =>
        ingredient.type === 'bun'), [ingredientsList]);

    const sauceIngredientsList = useMemo(() => ingredientsList.filter(ingredient =>
        ingredient.type === 'sauce'), [ingredientsList]);

    const mainIngredientsList = useMemo(() => ingredientsList.filter(ingredient =>
        ingredient.type === 'main'), [ingredientsList]);

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleIngredientClick = (ingredient) => {
        setIngredient(ingredient)
        handleOpenModal()
    }

    useEffect(() => {
        switch (currentCategory.type) {
            case ('bun'):
                buneSetRef.current?.scrollIntoView(options);
                break;
            case ('sauce'):
                sauceSetRef.current?.scrollIntoView(options);
                break;
            case ('main'):
                mainSetRef.current?.scrollIntoView(options);
                break;
            default: return;
        }
    }, [currentCategory])

    const handleTypeClick = (category) => {
        setCurrentCategory(category)
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
                        active={currentCategory.name === ingredient.name}
                        onClick={() => handleTypeClick(ingredient)} >
                        {ingredient.name}
                    </Tab>
                )}
            </div>
            <div className={styles.box + ' custom_scroll'}>
                <IngredientBlock
                    ref={buneSetRef}
                    key={'bun'}
                    name={'Булки'}
                    handleIngredientClick={handleIngredientClick}
                    ingredientList={bunIngredientsList} />
                <IngredientBlock
                    ref={sauceSetRef}
                    key={'sauce'}
                    name={'Соусы'}
                    handleIngredientClick={handleIngredientClick}
                    ingredientList={sauceIngredientsList} />
                <IngredientBlock
                    ref={mainSetRef}
                    key={'main'}
                    name={'Начинки'}
                    handleIngredientClick={handleIngredientClick}
                    ingredientList={mainIngredientsList} />
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


export default BurgerIngredients 