import { store } from '../../index';
import { getOrderTotalPrice, setTotalPrice } from './orderDetailsSlice';


describe('Order details slice', () => {

    it('Should set order total price', () => {
        const expectedValue = store.dispatch(setTotalPrice(100));

        expect({
            totalPrice: expectedValue.payload,
        })
            .toEqual({
                totalPrice: getOrderTotalPrice(store.getState())
            });
    });
});