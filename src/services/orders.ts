import { createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOrder } from '../model/types';

let wsUrl = 'wss://norma.nomoreparties.space/orders'
// let socket: WebSocket | null = null;
// let socket = new WebSocket(wsUrl);

export type Channel = 'redux' | 'general'


let ws: WebSocket;
function getSocket() {
    if (!ws) {
        ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
    };

    return ws;
}

const orderAdapter = createEntityAdapter<TOrder>();
export const api = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    tagTypes: ['order'],
    endpoints: (builder) => ({
        getOrders: builder.query<TOrder | any, number>({
            queryFn: (arg, queryApi, extraOptions, baseQuery) => {
                return { data: {}}
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                ws = getSocket()
                try {
                    await cacheDataLoaded;
                    // the /chat-messages endpoint responded already

                    ws.onopen = (event: Event) => {
                        console.log("Соединение установлено", event)
                    }

                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        console.log('event -> ', event)

                        updateCachedData((draft) => {
                            draft = data
                        })
                    }


                    const onOpenWs = () => {
                        console.log('Opening a connection...');

                        ws.send(JSON.stringify({}))
                    }

                    const onCloseWs = () => {
                        console.log('Close connection!');
                    }

                    const onErrorWs = (evt: any) => {
                        console.error(evt);
                    }

                    ws.addEventListener('close', onCloseWs);
                    ws.addEventListener('error', onErrorWs);
                    ws.addEventListener('message', listener);
                    ws.addEventListener('open', onOpenWs);


                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }

                await cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                ws.close()
            },
        }),
    }),
});

export const { useGetOrdersQuery } = api