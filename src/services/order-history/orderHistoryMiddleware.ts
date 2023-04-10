
import { Middleware } from 'redux';
import { startConnecting, connectionEstablished, receiveAllOrders, requestAllOrders, closeConnection } from '.';
import { getCookie } from '../../utils/coockie';


const OrderHistoryMiddleware: Middleware = store => {
    let socket: WebSocket

    console.log('OrderHistoryMiddleware');


    // socket.onopen = (event: any) => {
    //     console.log('Connection open...', event, event.data);
    //     store.dispatch(connectionEstablished());
    // }

    // socket.onmessage = (event: any) => {
    //     console.log('onopen get message...', event);
    //     store.dispatch(receiveAllOrders(JSON.parse(event.data)));
    // }

    return next => action => {

        const isConnectionEstablished = socket && store.getState().orderHistory.isConnected;

        if (startConnecting.match(action)) {
            socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`)
            console.log('match action', action);

            socket.onopen = (event: any) => {
                console.log('Connection open...', event, event.data);

                store.dispatch(connectionEstablished());
            }

            socket.onmessage = (event: any) => {
                console.log('Get message...', JSON.parse(event.data));
                store.dispatch(receiveAllOrders(JSON.parse(event.data)));
            }
        }

        // if (requestAllOrders.match(action) && isConnectionEstablished) {
        //     console.log('ordersMiddleware requestAllOrders');

        //     socket.onmessage = (event: any) => {
        //         console.log('Get message...');
        //         store.dispatch(receiveAllOrders(JSON.parse(event.data)));
        //     }
        // }

        if (requestAllOrders.match(action) && isConnectionEstablished) {
            console.log('ordersMiddleware requestAllOrders');
            socket.send(JSON.stringify({}))
        }

        if (closeConnection.match(action) && isConnectionEstablished) {
            console.log('ordersMiddleware requestAllOrders');
            socket.close();
        }

        return next(action);
    }
}



export default OrderHistoryMiddleware;