
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
            console.log('reducer startConnecting');

            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            console.log('reducer connectionEstablished');

            state.isConnected = true;
            state.isEstablishingConnection = true;
        }),
        closeConnection: (state => {
            console.log('reducer closeConnection');

            state.isConnected = false;
            state.isEstablishingConnection = false;
        }),
        receiveAllOrders: ((state, action: PayloadAction<TOrdersResponse>) => {
            console.log('receiveAllOrders', state, action.payload);

            state.orders = action.payload.orders.reverse();
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }),
        requestAllOrders: (state => {
            console.log('reducer requestAllOrders',);
        }),
    },
});



export const { startConnecting, connectionEstablished, receiveAllOrders, requestAllOrders, closeConnection } = orderHistorySlice.actions;


export const getAllOrders = (state: RootState) => state.orderHistory.orders;
// export const getTotal = (state: RootState) => state.orderHistory.total;
// export const getTotalToday = (state: RootState) => state.orderHistory.totalToday;
export const getIsConnected = (state: RootState) => state.orderHistory.isConnected;

export default orderHistorySlice.reducer;