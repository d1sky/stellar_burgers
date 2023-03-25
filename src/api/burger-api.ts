import { TIngredientTypes } from '../model/ingrediaents';
import { request } from './index'

export function getIngredients() {
    return request({ url: '/ingredients' }).then(ingredients  => ingredients.data.map((ingredient: TIngredientTypes) => ({ ...ingredient, count: 0 })));
}

export function placeOrder(ingredients: Array<string>) {
    return request({ url: '/orders', options: { method: 'POST', body: JSON.stringify({ ingredients }) } })
}