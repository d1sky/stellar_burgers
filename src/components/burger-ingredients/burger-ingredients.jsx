import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientList } from '../../services/ingredientListSlice';
import IngredientBlock from '../ingredient-block/ingredient-block';
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

const BurgerIngredients = () => {
    const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
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

    const onScroll = () => {
        let arr = [
            { type: 'bun', top: Math.abs(bunSetRef.current.getClientRects()[0].top) },
            { type: 'sauce', top: Math.abs(sauceSetRef.current.getClientRects()[0].top) },
            { type: 'main', top: Math.abs(mainSetRef.current.getClientRects()[0].top) }
        ]

        var min = arr.reduce(function (prev, current) {
            if (+current.top < +prev.top) {
                return current;
            } else {
                return prev;
            }
        });

        setCurrentCategory(CATEGORY_LIST.find(it => it.type === min.type))
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
                        active={currentCategory?.name === ingredient?.name}
                    >
                        {ingredient.name}
                    </Tab>
                )}
            </div>
            <div className={styles.box + ' custom_scroll'} onScroll={onScroll}>
                <IngredientBlock
                    ref={bunSetRef}
                    key={'bun'}
                    name={'Булки'}
                    ingredientList={bunIngredientsList} />
                <IngredientBlock
                    ref={sauceSetRef}
                    key={'sauce'}
                    name={'Соусы'}
                    ingredientList={sauceIngredientsList} />
                <IngredientBlock
                    ref={mainSetRef}
                    key={'main'}
                    name={'Начинки'}
                    ingredientList={mainIngredientsList} />
            </div>
        </section>
    );
}


export default BurgerIngredients 