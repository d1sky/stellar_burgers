import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  let [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(res => setIngredientsList(res.data))
      .catch(err => console.log(err))
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
