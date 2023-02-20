import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../api/burger-api';
import { addIngredient, removeIndgredient } from './burgerIngredientListSlice';


export const fetchIngredientListAsync = createAsyncThunk(
    'ingredientList/fetchIngredientListAsync',
    async () => {
        const data = await getIngredients()
        return data
    }
);

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        entities: [],
        status: 'idle',
    },
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
                            return (ingredient._id === action.payload._id) ? { ...ingredient, count: 2 } : { ...ingredient, count: 0 }
                        } else {
                            return ingredient
                        }
                    })
                } else {
                    state.entities = state.entities.map(ingredient =>
                        ingredient._id === action.payload._id ? { ...ingredient, count: ingredient?.count + 1 } : ingredient)
                }
            })
            .addCase(removeIndgredient, (state, action) => {
                state.entities = state.entities.map(ingredient => ingredient._id === action.payload._id ? { ...ingredient, count: ingredient?.count - 1 } : ingredient)
            })


    },
})

export const getIngredientList = (state) => state.ingredientList.entities;

export default ingredientListSlice.reducer