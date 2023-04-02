import { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';


const Ingredient: FC = () => {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
}

export default Ingredient;
