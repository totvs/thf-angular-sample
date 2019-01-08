import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order';
import { TotvsResponse } from '../shared/totvs-response.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdersService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getOrders(search?: string, status?: string) {
    let params;

    if (status) {
      params = { _expand: 'customer', status};
    } else {
      params = { _expand: 'customer'};
    }

    return this.http.get(`${this.apiUrl}orders`, { params }).pipe(
        map((response: TotvsResponse<Order>) => {
          response.items = response.items.map(item => {
            item.customerName = item.customer.name;
            delete item.customer;
            return item;
          });

          if (search) {
            search = search.toLocaleLowerCase();
            response.items = response.items
              .filter(item => Object.keys(item)
                .some(key => !(item[key] instanceof Object) && (String(item[key]).toLocaleLowerCase().includes(search)))
            );
          }
          return response;
        })
      );
  }

  getOrder(id: number) {
    return this.http.get(`${this.apiUrl}orders/${id}`);
  }

  addOrder(order: Order) {
    return this.http.post(`${this.apiUrl}orders`, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.apiUrl}orders/${id}`);
  }

  updateOrder(order: Order) {
    return this.http.put(`${this.apiUrl}orders/${order.id}`, order);
  }
}
