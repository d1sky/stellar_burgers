export type TOrder = {
    _id: string;
    ingredients: string[];
    accumIngredients?: { '_id': string, count: number }[];
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name?: string;
    price?: number;
}

export enum OrderStatus {
    "done" = "Готов",
    "create" = "Выполнен",
    "pending" = "Готовиться"
}

export type TOrdersResponse = {
    orders: Array<TOrder>;
    total: number | null;
    totalToday: number | null;
}