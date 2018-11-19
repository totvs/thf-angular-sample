import { OrderItem } from "./order-item";

export class Order {
    id: number;
    date: Date;
    customerId: number;
    customerName: string;
    status: string;
    total: number;
    items: Array<OrderItem>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
