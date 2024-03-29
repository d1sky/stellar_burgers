import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { TIngredientTypes } from '../model/ingrediaents';

const ingredientInitialState: TIngredientTypes = {
    "name": '',
    "type": '',
    "proteins": null,
    "fat": null,
    "carbohydrates": null,
    "calories": null,
    "price": null,
}

export const activeIngredientSlice = createSlice({
    name: 'activeIngredient',
    initialState: { ingredient: ingredientInitialState },
    reducers: {
        setActiveIngredient: (state, action) => {
            state.ingredient = action.payload
        },
        remove: (state) => {
            state.ingredient = ingredientInitialState
        }
    },
})

export const getActiveIngredient = (state: RootState) => state.activeIngredient.ingredient;
export const { setActiveIngredient, remove } = activeIngredientSlice.actions

export default activeIngredientSlice.reducer