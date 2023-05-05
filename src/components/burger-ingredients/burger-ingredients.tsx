import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useRef, useState } from 'react';

import { TIngredientTypes } from '../../model/ingrediaents';
import { getIngredientList } from '../../services/slices/ingredient-list/ingredientListSlice';
import IngredientBlock from '../ingredient-block/ingredient-block';
import styles from './burger-ingredients.module.css';
import { useSelector } from '../../hooks/hooks';

type TCategoryType = { name: string; type: string; }

const CATEGORY_LIST: Array<TCategoryType> = [
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

const BurgerIngredients: FC = () => {
    const [currentCategory, setCurrentCategory] = useState<TCategoryType | undefined>(CATEGORY_LIST[0]);
    const ingredientList = useSelector(getIngredientList);

    const bunSetRef = useRef<HTMLHeadingElement>(null!);
    const sauceSetRef = useRef<HTMLHeadingElement>(null!);
    const mainSetRef = useRef<HTMLHeadingElement>(null!);

    const bunIngredientsList = useMemo<Array<TIngredientTypes>>(() => ingredientList?.filter((ingredient: TIngredientTypes) =>
        ingredient.type === 'bun'), [ingredientList]);

    const sauceIngredientsList = useMemo<Array<TIngredientTypes>>(() => ingredientList?.filter((ingredient: TIngredientTypes) =>
        ingredient.type === 'sauce'), [ingredientList]);

    const mainIngredientsList = useMemo<Array<TIngredientTypes>>(() => ingredientList?.filter((ingredient: TIngredientTypes) =>
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

        setCurrentCategory(CATEGORY_LIST.find((category: TCategoryType) => category.type === min.type))
    }

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                Соберите бургер
            </div>
            <div className={styles.tabs}>
                {CATEGORY_LIST.map((category: TCategoryType) =>
                    <Tab
                        value={category.name}
                        key={category.type}
                        active={currentCategory?.name === category?.name}
                        onClick={() => { }}
                    >
                        {category.name}
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