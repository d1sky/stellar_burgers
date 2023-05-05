import { store } from '../..';
import {
    fetchIngredientListAsync,
} from './ingredientListSlice';

const ingredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0,
    "count": 0
};

const ingredientListSize = 15

describe('auth slice', () => {
    it('Should get ingredient list', async () => {

        await store.dispatch(fetchIngredientListAsync());

        expect(store.getState().ingredientList.entities[0])
            .toEqual({ ...ingredient, type: 'bun' });

        expect(store.getState().ingredientList.entities.length)
            .toEqual(ingredientListSize);
    });
});
