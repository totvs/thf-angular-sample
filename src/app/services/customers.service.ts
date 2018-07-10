import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Customer } from '../shared/customer';
import { TotvsResponse } from './../customers/customers.interface';

@Injectable()
export class CustomersService {

  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.apiUrl);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get(`${this.apiUrl}/${id}`).map((response: TotvsResponse<Customer>) => {
      return response.items;
    });
  }

  addCustomer(customer: Customer) {
    return this.http.post(this.apiUrl, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCustomer(customer) {
    const url = `${this.apiUrl}/${customer.id}`;

    return this.http.put(url, customer);
  }

}
