
import { useSelector } from 'react-redux';
import { getActiveIngredient } from '../../services/activeIngredientSlice';
import styles from './ingredient-details.module.css';


const IngredientDetails = () => {
  // const dispatch = useDispatch();
  const ingredient = useSelector(getActiveIngredient)

  // useEffect(() => { return dispatch(remove) }, [dispatch])

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