export class Customer {
  id: string;
  birthday: string;
  name: string;
  email: string;
  nationality: string;
  personality: string;
  phone: string;
  status: string;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
