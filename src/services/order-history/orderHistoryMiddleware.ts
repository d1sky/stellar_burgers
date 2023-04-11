
import { Middleware } from 'redux';
import { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } from '.';
import { getCookie } from '../../utils/coockie';


const OrderHistoryMiddleware: Middleware = store => {
    let socket: WebSocket

    return next => action => {

        const isConnectionEstablished = socket && store.getState().orderHistory.isConnected;

        if (startConnecting.match(action)) {
            socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`)

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



export default OrderHistoryMiddleware;