import { store } from '../../index';
import { clearActiveIngredient, getActiveIngredient, ingredientInitialState, setActiveIngredient } from './activeIngredientSlice';

describe('Active ingredient slice', () => {
    const ingredient = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
        count: 0
    };

    it('Should set active ingredient', () => {
        store.dispatch(setActiveIngredient(ingredient));

        expect({
            ingredient: ingredient,
        })
            .toEqual({
                ingredient: store.getState().activeIngredient.ingredient
            });
    });


    it('Should clear active ingredient', () => {
        store.dispatch(clearActiveIngredient());
        let activeIngredient = getActiveIngredient(store.getState())

        expect({
            ingredient: ingredientInitialState,
        })
            .toEqual({
                ingredient: activeIngredient
            });
    });
});
