import AppStyle from './App.module.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import data from './utils/data.json';
import order from './utils/order.json';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor order={order} />
      </main>
    </div>
  );
}

export default App;
