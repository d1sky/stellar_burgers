
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { TOrdersResponse } from '../../../model/types';
import { accumIngredients } from '../../../utils/accum';


export const orderFeedInitialState: TOrdersResponse & { status: string, isEstablishingConnection: boolean, isConnected: boolean, success: boolean } = {
    orders: [],
    total: null,
    totalToday: null,
    status: '',
    isEstablishingConnection: false,
    isConnected: false,
    success: false
}

const orderslice = createSlice({
    name: 'orders',
    initialState: orderFeedInitialState,
    reducers: {
        startConnecting: ((state, action) => {
            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            state.isConnected = true;
            state.isEstablishingConnection = true;
        }),
        closeConnection: (state => {
            state.isConnected = false;
            state.isEstablishingConnection = false;
            state.total = null;
            state.totalToday = null;
            state.orders = [];
        }),
        receiveAllOrders: ((state, action: PayloadAction<TOrdersResponse>) => {
            state.orders = action.payload.orders
                .map(order => ({ ...order, accumIngredients: accumIngredients(order.ingredients) }))
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }),
    },
});

export const { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } = orderslice.actions;

export const getAllOrders = (state: RootState) => state.orders.orders;
export const getTotal = (state: RootState) => state.orders.total;
export const getTotalToday = (state: RootState) => state.orders.totalToday;
export const getIsConnected = (state: RootState) => state.orders.isConnected;

export default orderslice.reducer;