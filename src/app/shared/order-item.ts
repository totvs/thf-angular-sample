export class OrderItem {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
