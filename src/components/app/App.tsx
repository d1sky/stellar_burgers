import data from '../../utils/data.json';
import order from '../../utils/order.json';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppStyle from './App.module.css';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients ingredientsList={data} />
        <BurgerConstructor order={order} />
      </main>
    </div>
  );
}

export default App;
