
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TOrdersResponse } from '../../model/types';

// export type TOrders = {
//     orders: Array<TOrder>,
//     total: number,
//     totalToday: number,
//     status: string,
//     isEstablishingConnection: boolean,
//     isConnected: boolean,
// }

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
            // let data = JSON.parse(action.payload);
            console.log('receiveAllOrders', state, action.payload);

            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }),
        requestAllOrders: (state => {
            console.log('reducer requestAllOrders',);
        }),
    },
});



export const { startConnecting, connectionEstablished, receiveAllOrders, requestAllOrders, closeConnection } = orderFeedSlice.actions;


export const getAllOrders = (state: RootState) => state.orderFeed.orders;
export const getTotal = (state: RootState) => state.orderFeed.total;
export const getTotalToday = (state: RootState) => state.orderFeed.totalToday;
export const getIsConnected = (state: RootState) => state.orderFeed.isConnected;

export default orderFeedSlice.reducer;