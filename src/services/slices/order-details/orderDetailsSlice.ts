import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { placeOrder } from '../../../api/burger-api';


export const fetchPlaceOrderAsync = createAsyncThunk(
    "orderDetails/fetchPlaceOrderAsync",
    placeOrder
);

export type TOrderDetails = {
    name: string;
    number: number | null
    totalPrice: number;
    status: string;
}

const orderDetailsInitialState: TOrderDetails = {
    name: '',
    number: null,
    totalPrice: 0,
    status: ''
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

export const getOrderDetailsList = (state: RootState) => state.orderDetails;
export const getOrderDetailsStatus = (state: RootState) => state.orderDetails.status;
export const getOrderTotalPrice = (state: RootState) => state.orderDetails.totalPrice;

export default orderDetailsSlice.reducer