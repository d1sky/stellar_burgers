
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { TIngredientTypes } from '../../model/ingrediaents';
import { setActiveIngredient } from "../../services/activeIngredientSlice";
import Card from '../card/card';
import styles from './ingredient-block.module.css';

type TProps = { name: string; ingredientList: Array<TIngredientTypes> };

const IngredientBlock = forwardRef<HTMLHeadingElement, TProps>((props, ref) => {
    const dispatch = useDispatch();
    const { name, ingredientList } = props;

    const handleIngredientClick = (ingredient: TIngredientTypes) => {
        dispatch(setActiveIngredient(ingredient))
    }

    return (
        <div className={styles.block} >
            <h2 className={styles.block_title} ref={ref}>{name}</h2>
            <div className={styles.block_container}>
                {ingredientList?.map((ingredient) =>
                    <Card
                        onClick={() => handleIngredientClick(ingredient)}
                        key={ingredient._id}
                        ingredient={ingredient} />)}
            </div>
        </div>
    );
})

export default IngredientBlock 