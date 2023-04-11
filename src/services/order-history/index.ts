
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TOrdersResponse } from '../../model/types';


const orderFeedInitialState: TOrdersResponse = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: '',
    isEstablishingConnection: false,
    isConnected: false
}

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: orderFeedInitialState,
    reducers: {
        startConnecting: (state => {
            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            state.isConnected = true;
            state.isEstablishingConnection = true;
        }),
        closeConnection: (state => {
            state.isConnected = false;
            state.isEstablishingConnection = false;
        }),
        receiveAllOrders: ((state, action: PayloadAction<TOrdersResponse>) => {
            state.orders = action.payload.orders.reverse();
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }),
    },
});



export const { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } = orderHistorySlice.actions;


export const getAllOrders = (state: RootState) => state.orderHistory.orders;
export const getIsConnected = (state: RootState) => state.orderHistory.isConnected;

export default orderHistorySlice.reducer;