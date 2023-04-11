import { request, TResponse } from './index';

export function getOrderById(id: string): Promise<TResponse> {
    return request({ url: '/orders/' + id })
    // .then(res => res.data);
}