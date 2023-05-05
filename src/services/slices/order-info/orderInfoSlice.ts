import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { getOrderById } from '../../../api/orders-api';
import { TOrder } from '../../../model/types';
import { accumIngredients } from '../../../utils/accum';


export const fetchGetOrderAsync = createAsyncThunk(
    "orderInfo/fetchGetOrderAsync",
    getOrderById
);

export const orderDetailsInitialState: { status: string, order: TOrder } = {
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
    reducers: {
        cleanOrder: (state) => {
            state.order = orderDetailsInitialState.order
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.order = { ...action.payload.orders[0], accumIngredients: accumIngredients(action.payload.orders[0].ingredients) }
            });
    },
})

export const { cleanOrder } = orderInfoSlice.actions;

export const getOrderInfo = (state: RootState) => state.orderInfo.order;

export default orderInfoSlice.reducer