import { useEffect, useReducer, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { getIngredients } from '../../api/burger-api'
import { IngredientsContext, TotalPriceContext, OrderContext } from '../../services/appContext';

const orderInitialState = [];

function reducer(state, action) {
  let orderDetails = null

  switch (action.type) {
    case "add":
      orderDetails = action.payload
      return orderDetails;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  let [ingredientsList, setIngredientsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, orederDetailsDispatcher] = useReducer(reducer, orderInitialState, undefined);

  useEffect(() => {
    getIngredients().then(ingredients => {
      setIngredientsList(ingredients)
    })
  }, [])

  return (
    <IngredientsContext.Provider value={{ ingredientsList, setIngredientsList }}>
      <OrderContext.Provider value={{ orderDetails, orederDetailsDispatcher }}>
        <div className="App">
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients />
            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
              <BurgerConstructor />
            </TotalPriceContext.Provider>
          </main>
        </div>
      </OrderContext.Provider >
    </IngredientsContext.Provider >
  );
}

export default App;
