import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getIngredients } from '../api/burger-api';
import { TIngredientTypes } from '../model/ingrediaents';
import { addIngredient, removeIndgredient, resetIndgredient } from './burgerIngredientListSlice';


export const fetchIngredientListAsync = createAsyncThunk(
    "ingredientList/fetchIngredientListAsync",
    getIngredients
);

type TOrderIngredientList = {
    entities: Array<TIngredientTypes>,
    status: string,
};

const orderIngredientListInitialState: TOrderIngredientList = {
    entities: [],
    status: 'idle',
};

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: orderIngredientListInitialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredientListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.entities = action.payload;
            })
            .addCase(addIngredient, (state, action) => {
                // Увеличение счетчика ингредиентов c логикой проверки наличия булок
                if (action.payload.type === 'bun') {
                    state.entities = state.entities.map(ingredient => {
                        if (ingredient.type === 'bun') {
                            return (ingredient._id === action.payload._id) ? { ...ingredient, count: 2 } : { ...ingredient, count: 0 };
                        } else {
                            return ingredient;
                        }
                    });
                } else {
                    state.entities = state.entities.map(ingredient => ingredient._id === action.payload._id ? { ...ingredient, count: ingredient?.count! + 1 } : ingredient);
                }
            })
            .addCase(removeIndgredient, (state, action) => {
                state.entities = state.entities.map(ingredient => ingredient._id === action.payload._id ? { ...ingredient, count: ingredient?.count! - 1 } : ingredient);
            })
            .addCase(resetIndgredient, (state) => {
                state.entities = state.entities.map(ingredient => ({ ...ingredient, count: 0 }));
            });
    },
    reducers: {}
})

export const getIngredientList = (state: RootState) => state.ingredientList.entities;

export default ingredientListSlice.reducer