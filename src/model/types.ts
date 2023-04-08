export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name?: string;
}

export enum OrderStatus  {
    "done" = "Готов",
    "create" = "Выполнен"
  }