import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/product';
import { ThfLookupFilter } from '@totvs/thf-ui/components/thf-field';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService implements ThfLookupFilter {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post(this.apiUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: Product) {
    const url = `${this.apiUrl}/${product.id}`;

    return this.http.put(url, product);
  }

  getFilteredData(filter: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.apiUrl, { params: { _page: page.toString(), _limit: pageSize.toString(), q: filter } });
  }

  getObjectByValue(value: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${value}`);
  }
}
