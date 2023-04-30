import { configureStore } from '@reduxjs/toolkit';
import activeIngredientSlice from './activeIngredientSlice';
import authSlice from './authSlice';
import burgerIngredientListSlice from './burgerIngredientListSlice';
import ingredientListSlice from './ingredientListSlice';
import orderslice from './orders';
import ordersleware from './orders/socket-middleware';
import orderDetailsSlice from './orderDetailsSlice';
import orderInfoSlice from './orderInfoSlice';


export const store = configureStore({
  reducer: {
    ingredientList: ingredientListSlice,
    orderDetails: orderDetailsSlice,
    activeIngredient: activeIngredientSlice,
    burgerIngredientList: burgerIngredientListSlice,
    auth: authSlice,
    orders: orderslice,
    orderInfo: orderInfoSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ordersleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch