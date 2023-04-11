import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getOrderById } from '../api/orders-api';
import { TOrder } from '../model/types';


export const fetchGetOrderAsync = createAsyncThunk(
    "orderInfo/fetchGetOrderAsync",
    getOrderById
);

const orderDetailsInitialState: { status: string, order: TOrder } = {
    status: '',
    order: {
        _id: '',
        ingredients: [],
        status: '',
        number: 0,
        createdAt: '',
        updatedAt: '',
        name: '',
    }
}

export const orderInfoSlice = createSlice({
    name: 'orderInfo',
    initialState: orderDetailsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('fetchGetOrderAsync', action.payload.orders[0]);

                state.order = action.payload.orders[0]
            });
    },
})


export const getOrderInfo = (state: RootState) => state.orderInfo.order;


export default orderInfoSlice.reducer