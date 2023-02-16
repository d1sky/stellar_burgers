import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { placeOrder } from '../api/burger-api';

export const fetchPlaceOrderAsync = createAsyncThunk(
    'orderDetails/fetchPlaceOrderAsync',
    async (ingredients) => {
        const data = await placeOrder(ingredients)
        return data
    }
);

const orderDetailsInitialState = {
    name: '',
    number: null,
    totalPrice: 0
}

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: orderDetailsInitialState,
    reducers: {
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaceOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaceOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.name = action.payload.name;
                state.number = action.payload.order?.number;
            });
    },
})

export const { setTotalPrice } = orderDetailsSlice.actions;

export const getOrderDetailsList = (state) => state.orderDetails;
export const getOrderTotalPrice = (state) => state.orderDetails.totalPrice;

export default orderDetailsSlice.reducer