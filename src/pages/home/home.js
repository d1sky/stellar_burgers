import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import styles from './home.module.css';


const Home = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchIngredientListAsync())
  }, [dispatch])

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default Home;
