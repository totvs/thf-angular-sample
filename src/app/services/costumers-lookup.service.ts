import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ThfLookupFilter } from '@totvs/thf-ui/components/thf-field';

@Injectable()
export class CustomersLookupService implements ThfLookupFilter {

  private apiUrl = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) { }

  getFilteredData(filter: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.apiUrl, { params: { page: page.toString(), pageSize: pageSize.toString(), filter } });
  }

  getObjectByValue(value: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?label=${value}`);
  }

}