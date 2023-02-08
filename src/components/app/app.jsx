import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { getIngredients } from '../../api/burger-api'


const App = () => {
  let [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    getIngredients().then(ingredients => {
      setIngredientsList(ingredients)
    })
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredientsList={ingredientsList} />
        <BurgerConstructor order={ingredientsList} />
      </main>
    </div>
  );
}

export default App;
