import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import './index.css';
import activeIngredientSlice from './services/activeIngredientSlice';
import authSlice from './services/authSlice';
import burgerIngredientListSlice from './services/burgerIngredientListSlice';
import ingredientListSlice from './services/ingredientListSlice';
import orderDetailsSlice from './services/orderDetailsSlice';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    ingredientList: ingredientListSlice,
    orderDetails: orderDetailsSlice,
    activeIngredient: activeIngredientSlice,
    burgerIngredientList: burgerIngredientListSlice,
    auth: authSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// reportWebVitals();
