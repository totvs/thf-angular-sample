import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Customer } from '../shared/customer';

@Injectable()
export class CustomersService {

  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(this.apiUrl);
  }

  getClient(id: string): Observable<Customer> {

    return this.http.get(`${this.apiUrl}/${id}`).map(response => {
      return new Customer(response);
    });
  }

  addClient(customer: Customer) {
    return this.http.post(this.apiUrl, customer);
  }

  deleteClient(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateClient(customer) {
    const url = `${this.apiUrl}/${customer.id}`;

    return this.http.put(url, customer);
  }

}
