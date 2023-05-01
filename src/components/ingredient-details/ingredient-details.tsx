

import { getActiveIngredient } from '../../services/slices/active-ingredient/activeIngredientSlice';
import styles from './ingredient-details.module.css';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { setActiveIngredient } from '../../services/slices/active-ingredient/activeIngredientSlice';
import { getIngredientList } from '../../services/slices/ingredient-list/ingredientListSlice';
import { TIngredientTypes } from '../../model/ingrediaents';


const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  let { ingredientId } = useParams();
  const burgerIngredientList: Array<TIngredientTypes> = useSelector(getIngredientList);

  useEffect(() => {
    dispatch(setActiveIngredient(burgerIngredientList.find(ingredient => ingredient._id === ingredientId)))
  }, [dispatch, burgerIngredientList, ingredientId])

  const ingredient: TIngredientTypes = useSelector(getActiveIngredient)

  return (
    <div className={`${styles.modal}`}>
      <p className={` ${styles.image}`}><img src={ingredient?.image_large} alt={ingredient?.name} /></p>
      <p className={`text  text_type_main-medium text_type_main-medium mt-4 ${styles.title}`}>{ingredient?.name}</p>
      <div className={`text  text_type_main-default text_color_inactive mt-8 mb-15 ${styles?.composition}`}>
        <div>
          <span>Калории, ккал</span>
          <span>{ingredient?.calories}</span>
        </div>
        <div>
          <span>Белки, г</span>
          <span>{ingredient?.proteins}</span>
        </div>
        <div>
          <span>Жиры, г</span>
          <span>{ingredient?.fat}</span>
        </div>
        <div>
          <span>Углеводы, г</span>
          <span>{ingredient?.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}


export default IngredientDetails;