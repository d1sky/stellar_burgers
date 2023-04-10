export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name?: string;
}

export enum OrderStatus {
    "done" = "Готов",
    "create" = "Выполнен"
}

export type TOrdersResponse = {
    orders: Array<TOrder>,
    total: number,
    totalToday: number,
    status: string,
    isEstablishingConnection: boolean,
    isConnected: boolean,
}