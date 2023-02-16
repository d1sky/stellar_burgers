import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientListAsync())
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
