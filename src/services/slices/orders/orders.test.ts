import { store } from '../../index';
import { startConnecting, connectionEstablished, receiveAllOrders, closeConnection, getTotal, getTotalToday, getAllOrders, orderFeedInitialState } from './ordersSlice';


describe('Order slice', () => {

    const orders = [{
        "_id": "644e720a45c6f2001be6f40b",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e"
        ],
        "status": "done",
        "name": "Люминесцентный флюоресцентный бургер",
        "createdAt": "2023-04-30T13:50:02.839Z",
        "updatedAt": "2023-04-30T13:50:02.883Z",
        "number": 2376,
        "accumIngredients": [
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "count": 2
            },
            {
                "_id": "643d69a5c3f7b9001cfa093e",
                "count": 1
            }
        ]
    }]

    it('Should start connect', () => {
        store.dispatch(startConnecting('wss://norma.nomoreparties.space/orders/all'));

        expect({
            isEstablishingConnection: true
        })
            .toEqual({
                isEstablishingConnection: store.getState().orders.isEstablishingConnection
            });
    });

    it('Should connected', () => {
        store.dispatch(connectionEstablished());

        expect({
            isConnected: true,
            isEstablishingConnection: true
        })
            .toEqual({
                isConnected: store.getState().orders.isConnected,
                isEstablishingConnection: store.getState().orders.isEstablishingConnection
            });
    });

    it('Should recieve all orders', () => {
        store.dispatch(receiveAllOrders({ orders, total: 1, totalToday: 1 }));

        expect({
            isConnected: true,
            isEstablishingConnection: true,
            total: 1,
            totalToday: 1,
            orders
        })
            .toEqual({
                isConnected: store.getState().orders.isConnected,
                isEstablishingConnection: store.getState().orders.isEstablishingConnection,
                total: getTotal(store.getState()),
                totalToday: getTotalToday(store.getState()),
                orders: getAllOrders(store.getState())
            });
    });

    it('Should close connection', () => {
        store.dispatch(closeConnection());

        expect({
            ...orderFeedInitialState
        })
            .toEqual({
                ...orderFeedInitialState,
                isConnected: store.getState().orders.isConnected,
                isEstablishingConnection: store.getState().orders.isEstablishingConnection,
                total: getTotal(store.getState()),
                totalToday: getTotalToday(store.getState()),
                orders: getAllOrders(store.getState())
            });
    });
});