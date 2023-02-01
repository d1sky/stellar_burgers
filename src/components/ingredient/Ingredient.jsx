
import React from 'react'; // импорт библиотеки
import IngredientStyle from './Ingredient.module.css';
import { DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../price/Price'

const Ingredient = ({ order, top, bottom, key }) => {

    let style = IngredientStyle.ingredient + ' ' + (top && IngredientStyle.ingredient_top) + ' ' + (bottom && IngredientStyle.ingredient_bottom);


    return <div className={IngredientStyle.block} key={key}>
        <div className={IngredientStyle.mover}>
            {!(top || bottom) &&

                <DragIcon type="primary" />

            }
        </div>
        <div className={style}>
            <div className={IngredientStyle.left}>
                <div className={IngredientStyle.illustration}>
                    <img src={order.image} alt='pic' />
                </div>
                <div className={IngredientStyle.name}>
                    {order.name}
                </div>
            </div>
            <div className={IngredientStyle.right}>
                <Price price={order.price} />
                <div className={IngredientStyle.element}>
                    <DeleteIcon type="primary" />
                </div>
            </div>


        </div>
    </div>
}

export default Ingredient 