import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { Subscription } from 'rxjs';

@Injectable()
export class OrderStatusService {

  private literalsSubscription: Subscription;
  private literals = {};
  private statusOptions;

  constructor(
    private http: HttpClient,
    private thfI18nService: ThfI18nService
    ) {
      this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
        this.literals = literals;
        this.statusOptions = [
          { label: this.literals['pending'], value: '1' },
          { label: this.literals['cancelled'], value: '2' },
          { label: this.literals['completed'], value: '3' }
        ];
      });
     }

  getStatusOptions() {
    return this.statusOptions;
  }

  getStatus(value: string) {
    return this.statusOptions.filter((item: any) => {
      return item.value === value;
     });
  }

}
