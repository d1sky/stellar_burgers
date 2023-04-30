import { store } from '../../index';
import { orderDetailsInitialState, cleanOrder, getOrderInfo } from './orderInfoSlice';


describe('Order info slice', () => {

    it('Should clean order info', () => {
        store.dispatch(cleanOrder);

        expect({
            order: orderDetailsInitialState.order
        })
            .toEqual({
                order: getOrderInfo(store.getState())
            });
    });
});