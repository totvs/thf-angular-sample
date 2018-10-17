import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order';
import { TotvsResponse } from '../shared/totvs-response.interface';

@Injectable()
export class OrdersService {

  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getOrders(search?: string, status?: string) {
    let params;

    if (status) {
      params = { _expand: 'customer', status};
    } else {
      params = { _expand: 'customer'};
    }

    return this.http.get(this.apiUrl, { params }).map((response: TotvsResponse<Order>) => {
      response.items = response.items.map(item => {
        item.customerName = item.customer.name;
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
    });
  }

  getOrder(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, { params: {_expand: 'customer'} })
      .map((response: any) => {
        response.customerName = response.customer.name;
        return response;
      });
  }

  addOrder(order: Order) {
    return this.http.post(this.apiUrl, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateOrder(order: Order) {
    const url = `${this.apiUrl}/${order.id}`;

    return this.http.put(url, order);
  }
}
