export class Order {
    id: number;
    date: Date;
    customerId: number;
    customerName: string;
    status: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
