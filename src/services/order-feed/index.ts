
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

const orderFeedSlice = createSlice({
    name: 'orderFeed',
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
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }),
    },
});



export const { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } = orderFeedSlice.actions;


export const getAllOrders = (state: RootState) => state.orderFeed.orders;
export const getTotal = (state: RootState) => state.orderFeed.total;
export const getTotalToday = (state: RootState) => state.orderFeed.totalToday;
export const getIsConnected = (state: RootState) => state.orderFeed.isConnected;

export default orderFeedSlice.reducer;