
import { Middleware } from 'redux';
import { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } from '.';


const ordersMiddleware: Middleware = store => {
    let socket: WebSocket

    return next => action => {

        const isConnectionEstablished = socket && store.getState().orderFeed.isConnected;

        if (startConnecting.match(action)) {
            socket = new WebSocket('wss://norma.nomoreparties.space/orders/all')

            socket.onopen = (event: any) => {
                store.dispatch(connectionEstablished());
            }

            socket.onmessage = (event: any) => {
                store.dispatch(receiveAllOrders(JSON.parse(event.data)));
            }
        }

        if (closeConnection.match(action) && isConnectionEstablished) {
            socket.close();
        }

        return next(action);
    }
}



export default ordersMiddleware;