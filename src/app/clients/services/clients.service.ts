import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

import { Customer } from './../../shared/customer';

@Injectable()
export class ClientsService {

  apiUrl = 'http://localhost:3000/clients';

  public readonly columns: Array<ThfTableColumn> = [
    { column: 'id', label: 'Código', type: 'string' },
    { column: 'name', label: 'Nome', type: 'string' },
    { column: 'email', label: 'E-mail', type: 'string' },
    { column: 'phone',  label: 'Telefone', type: 'string' },
    { column: 'status', label: 'Influência', type: 'label', width: '5%', labels: [
      { value: 'rebel', color: 'success', label: 'Rebel' },
      { value: 'tatooine', color: 'warning', label: 'Tattoine' },
      { value: 'galactic', color: 'danger', label: 'Galactic' }
    ]},
  ];

  constructor(private http: HttpClient) { }

  public getClients() {
    const url = this.apiUrl;

    return this
            .http
            .get(url)
            .map(response => {
              return response;
            })
            .catch(this.handleError);
  }

  getClient(id: string): Observable<Customer> {
    const url = this.apiUrl + '/' + id;

    return this
      .http
      .get(url)
      .map(response => {
        return new Customer(response);
      })
      .catch(this.handleError);
  }

  addClient(customer: Customer) {
    const url = this.apiUrl;
    const obj = customer;

    return this
      .http
      .post(url, obj)
      .subscribe(() => this.getClients());
  }

  deleteClient(id: string) {
    const url = this.apiUrl + '/' + id;

    return this
      .http
      .delete(url)
      .map(response => {
        return response;
      });
  }

  updateClient(customer) {
    const url = this.apiUrl + '/' + customer.id;

    const obj = customer;
    this
      .http
      .put(url, obj)
      .subscribe(() => this.getClients());
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
