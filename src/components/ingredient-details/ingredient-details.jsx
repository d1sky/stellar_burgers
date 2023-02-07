
import styles from './ingredient-details.module.css';


const IngredientDetails = ({ ingredient }) => {

  return (
    <div className={`${styles.modal}`}>
      <p className={`text text_type_main-large text_color_primary mt-10 ${styles.title}`}>Детали ингридиента</p>
      <p className={` ${styles.image}`}><img src={ingredient.image} alt='card pic' /></p>
      <p className={`text  text_type_main-medium text_type_main-medium mt-4 ${styles.title}`}>Биокотлета из марсианской Магнолии</p>
      <p className={`text  text_type_main-default text_color_inactive mt-8 ${styles.composition}`}>
        <ul>
          <li>
            <div>
              <span>Калории, ккал</span>
              <span>244,4</span>
            </div>
          </li>
          <li>
            <div>
              <span>Белки, г</span>
              <span>12,2</span>
            </div>
          </li>
          <li>
            <div>
              <span>Жиры, г</span>
              <span>17,2</span>
            </div>
          </li>
          <li>
            <div>
              <span>Углеводы, г</span>
              <span>10,2</span>
            </div>
          </li>
        </ul>
      </p>
    </div>
  );
}

export default IngredientDetails;
