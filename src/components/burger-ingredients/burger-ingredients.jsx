import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../services/activeIngredientSlice';
import { getIngredientList } from '../../services/ingredientListSlice';
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
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const ingredientList = useSelector(getIngredientList);

    const bunSetRef = useRef(null);
    const sauceSetRef = useRef(null);
    const mainSetRef = useRef(null);

    const bunIngredientsList = useMemo(() => ingredientList?.filter(ingredient =>
        ingredient.type === 'bun'), [ingredientList]);

    const sauceIngredientsList = useMemo(() => ingredientList?.filter(ingredient =>
        ingredient.type === 'sauce'), [ingredientList]);

    const mainIngredientsList = useMemo(() => ingredientList?.filter(ingredient =>
        ingredient.type === 'main'), [ingredientList]);

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => {
        dispatch(remove())
        setIsModalOpen(false)
    }

    useEffect(() => {
        switch (currentCategory.type) {
            case ('bun'):
                bunSetRef.current?.scrollIntoView(options);
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
                    ref={bunSetRef}
                    key={'bun'}
                    name={'Булки'}
                    handleOpenModal={handleOpenModal}
                    ingredientList={bunIngredientsList} />
                <IngredientBlock
                    ref={sauceSetRef}
                    key={'sauce'}
                    name={'Соусы'}
                    handleOpenModal={handleOpenModal}
                    ingredientList={sauceIngredientsList} />
                <IngredientBlock
                    ref={mainSetRef}
                    key={'main'}
                    name={'Начинки'}
                    handleOpenModal={handleOpenModal}
                    ingredientList={mainIngredientsList} />
            </div>
            {isModalOpen &&
                <Modal
                    title={'Детали ингридиента'}
                    handleClose={handleCloseModal}
                >
                    <IngredientDetails />
                </Modal>
            }

        </section>
    );
}


export default BurgerIngredients 