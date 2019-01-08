import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';





import { Customer } from '../shared/customer';
import { ThfLookupFilter } from '@totvs/thf-ui/components/thf-field';

@Injectable()
export class CustomersService implements ThfLookupFilter {

  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.apiUrl);
  }

  getCustomer(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCustomer(customer: Customer) {
    return this.http.post(this.apiUrl, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCustomer(customer: Customer) {
    const url = `${this.apiUrl}/${customer.id}`;

    return this.http.put(url, customer);
  }

  getFilteredData(filter: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.apiUrl, { params: { _page: page.toString(), _limit: pageSize.toString(), q: filter } });
  }

  getObjectByValue(value: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${value}`);
  }
}
