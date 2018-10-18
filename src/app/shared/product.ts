export class Product {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    price: number;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
