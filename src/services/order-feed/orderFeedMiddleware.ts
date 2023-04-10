
import { Middleware } from 'redux';
import { startConnecting, connectionEstablished, receiveAllOrders, requestAllOrders, closeConnection } from '.';


const ordersMiddleware: Middleware = store => {
    let socket: WebSocket

    // socket.onopen = (event: any) => {
    //     console.log('Connection open...', event, event.data);
    //     store.dispatch(connectionEstablished());
    // }

    // socket.onmessage = (event: any) => {
    //     console.log('onopen get message...', event);
    //     store.dispatch(receiveAllOrders(JSON.parse(event.data)));
    // }

    return next => action => {

        const isConnectionEstablished = socket && store.getState().orderFeed.isConnected;

        if (startConnecting.match(action)) {
            socket = new WebSocket('wss://norma.nomoreparties.space/orders/all')
            console.log('match action', action);

            socket.onopen = (event: any) => {
                console.log('Connection open...', event, event.data);

                store.dispatch(connectionEstablished());
            }

            socket.onmessage = (event: any) => {
                console.log('Get message...');
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



export default ordersMiddleware;