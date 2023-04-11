import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import activeIngredientSlice from './activeIngredientSlice';
import authSlice from './authSlice';
import burgerIngredientListSlice from './burgerIngredientListSlice';
import ingredientListSlice from './ingredientListSlice';
import orderDetailsSlice from './orderDetailsSlice';
import orderFeedSlice from './order-feed/index';
import orderHistorySlice from './order-history/index';
import orderFeedMiddleware from './order-feed/orderFeedMiddleware';
import orderHistoryMiddleware from './order-history/orderHistoryMiddleware';
import orderInfoSlice from './orderInfoSlice';


export const store = configureStore({
  reducer: {
    ingredientList: ingredientListSlice,
    orderDetails: orderDetailsSlice,
    activeIngredient: activeIngredientSlice,
    burgerIngredientList: burgerIngredientListSlice,
    auth: authSlice,
    orderFeed: orderFeedSlice,
    orderHistory: orderHistorySlice,
    orderInfo: orderInfoSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderFeedMiddleware, orderHistoryMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch