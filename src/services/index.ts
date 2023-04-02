import { configureStore } from '@reduxjs/toolkit';
import activeIngredientSlice from './activeIngredientSlice';
import authSlice from './authSlice';
import burgerIngredientListSlice from './burgerIngredientListSlice';
import ingredientListSlice from './ingredientListSlice';
import orderDetailsSlice from './orderDetailsSlice';

export const store = configureStore({
    reducer: {
      ingredientList: ingredientListSlice,
      orderDetails: orderDetailsSlice,
      activeIngredient: activeIngredientSlice,
      burgerIngredientList: burgerIngredientListSlice,
      auth: authSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
  
  export type RootState = ReturnType<typeof store.getState>
  
  export type AppDispatch = typeof store.dispatch