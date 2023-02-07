
import { ingredientTypes } from '../../model/ingrediaents';
import styles from './ingredient-details.module.css';


const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles.modal}`}>
      <p className={` ${styles.image}`}><img src={ingredient.image} alt='card pic' /></p>
      <p className={`text  text_type_main-medium text_type_main-medium mt-4 ${styles.title}`}>{ingredient.name}</p>
      <div className={`text  text_type_main-default text_color_inactive mt-8 mb-15 ${styles.composition}`}>
        <ul>
          <li>
            <div>
              <span>Калории, ккал</span>
              <span>{ingredient.calories}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Белки, г</span>
              <span>{ingredient.proteins}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Жиры, г</span>
              <span>{ingredient.fat}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Углеводы, г</span>
              <span>{ingredient.carbohydrates}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientTypes.isRequired
};

export default IngredientDetails;