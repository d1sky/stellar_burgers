
import { Middleware } from 'redux';
import { startConnecting, connectionEstablished, receiveAllOrders, closeConnection } from '../slices/orders/ordersSlice';
import { updateToken } from '../../api/auth-api';
import { TOrdersResponse } from '../../model/types';


const SocketMiddleware: Middleware = store => {
    let socket: WebSocket | null = null
    let url = ''
    let isConnected = false
    let reconnectTimer = 0

    return next => action => {
        const { dispatch } = store

        if (startConnecting.match(action)) {
            url = action.payload!
            socket = new WebSocket(url)
            isConnected = true
            window.clearTimeout(reconnectTimer)
            reconnectTimer = 0
            socket = new WebSocket(action.payload!)

            socket.onopen = () => {
                store.dispatch(connectionEstablished());
            }

            socket.onmessage = (event: MessageEvent) => {
                const { data } = event
                const parsedData: TOrdersResponse = JSON.parse(data)
                if (!data.success) {
                    updateToken().then(() => {
                        store.dispatch(receiveAllOrders(parsedData));
                    })
                } else {
                    store.dispatch(receiveAllOrders(parsedData));
                }

            }

            socket.onerror = () => {
                console.log('Websocket error');
            }

            socket.onclose = (event: CloseEvent) => {
                if (event.code !== 1000) {
                    console.log('Websocket error', event.code.toString());
                }

                if (isConnected) {
                    dispatch(connectionEstablished())
                    reconnectTimer = window.setTimeout(() => {
                        dispatch(startConnecting(url))
                    }, 3000)
                }
            }
        }

        if (socket && closeConnection.match(action)) {
            window.clearTimeout(reconnectTimer)
            isConnected = false
            reconnectTimer = 0
            socket.close();
        }

        return next(action);
    }
}



export default SocketMiddleware;