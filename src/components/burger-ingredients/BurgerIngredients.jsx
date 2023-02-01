
import IngredientBlock from '../ingredient-block/IngredientBlock';
import BurgerIngredientsStyle from './BurgerIngredientsStyle.module.css';


const BurgerIngredients = ({ data }) => {

    return (
        <section className={BurgerIngredientsStyle.container}>
            <div className={BurgerIngredientsStyle.title}>
                Соберите бургер
            </div>
            <div className={BurgerIngredientsStyle.tabs}>
                <div className={BurgerIngredientsStyle.tab_active}>Булки</div>
                <div className={BurgerIngredientsStyle.tab}>Соусы</div>
                <div className={BurgerIngredientsStyle.tab}>Начинки</div>
            </div>
            <div className={BurgerIngredientsStyle.box + ' custom_scroll'}>
                <IngredientBlock name={'Булки'} data={data.filter(it => it.type === 'bun')} />
                <IngredientBlock name={'Соусы'} data={data.filter(it => it.type === 'sauce')} />
                <IngredientBlock name={'Начинки'} data={data.filter(it => it.type === 'main')} />
            </div>
        </section>
    );
}


export default BurgerIngredients 