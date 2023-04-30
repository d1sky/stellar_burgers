import { configureStore } from '@reduxjs/toolkit';
import activeIngredientSlice from './slices/active-ingredient/activeIngredientSlice';
import authSlice from './slices/auth/authSlice';
import burgerIngredientListSlice from './slices/burger-ingredient-list/burgerIngredientListSlice';
import ingredientListSlice from './slices/ingredient-list/ingredientListSlice';
import orderslice from './slices/orders/ordersSlice';
import ordersleware from './middlewares/socket-middleware';
import orderDetailsSlice from './slices/order-details/orderDetailsSlice';
import orderInfoSlice from './slices/order-info/orderInfoSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    ingredientList: ingredientListSlice,
    activeIngredient: activeIngredientSlice,
    burgerIngredientList: burgerIngredientListSlice,
    orders: orderslice,
    orderInfo: orderInfoSlice,
    orderDetails: orderDetailsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ordersleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch