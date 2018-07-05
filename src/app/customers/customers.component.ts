import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfDisclaimer } from '@totvs/thf-ui/components/thf-disclaimer/thf-disclaimer.interface';
import { ThfDisclaimerGroup } from '@totvs/thf-ui/components/thf-disclaimer-group';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n/thf-i18n.service';

import { CustomersService } from '../services/customers.service';
import { Customer } from './../shared/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnDestroy, OnInit {

  pageActions: Array<ThfPageAction>;
  tableActions: Array<ThfPageAction>;

  breadcrumb: ThfBreadcrumb;
  disclaimerGroup: ThfDisclaimerGroup;
  filterSettings: ThfPageFilter;

  columns: Array<ThfTableColumn>;
  items: Array<Customer>;
  itemsFiltered: Array<Customer>;

  isLoading: boolean = true;
  labelFilter = '';
  literals = {};

  private disclaimers: Array<ThfDisclaimer> = [];

  private customersSubscription: Subscription;
  private literalsSubscription: Subscription;

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private thfI18nService: ThfI18nService
  ) { }

  ngOnDestroy(): void {
    this.customersSubscription.unsubscribe();
    this.literalsSubscription.unsubscribe();
  }

  ngOnInit() {

    this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.getClients();

    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
  }

  filterAction() {
    this.populateDisclaimers([this.labelFilter]);
    this.filter();
  }

  private applyFilters(filters) {
    this.itemsFiltered = this.items.filter(item => {
      return Object.keys(item)
      .some(key => (!(item[key] instanceof Object) && this.includeFilter(item[key], filters)));
    });
  }

  private editCustomer(customer: Customer) {
    this.router.navigate(['/edit', customer.id]);
  }

  private filter() {
    const filters = this.disclaimers.map(disclaimer => disclaimer.value);
    if (this.itemsFiltered) {
      this.applyFilters(filters);
      if (this.labelFilter === '' || !this.disclaimers.length) {
        this.resetFilterHiringProcess();
      }
    }
  }

  private getClients() {
    this.customersSubscription = this.customersService.getClients().subscribe((customers: Array<Customer>) => {
      this.items = customers;
      this.itemsFiltered = [...this.items];

      this.isLoading = false;
    });
  }

  private includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private onChangeDisclaimer(disclaimers) {
    this.disclaimers = disclaimers;
    this.filter();
  }

  private populateDisclaimers(filters: Array<any>) {
    this.disclaimers = filters.map(value => ({ value }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  private resetFilterHiringProcess() {
    this.itemsFiltered = [...this.items];
    this.labelFilter = '';
  }

  private setLiteralsDefaultValues() {
    this.pageActions = [
      { label: this.literals['addNewClient'], action: () => this.router.navigate(['/new-customer']), icon: 'thf-icon-plus' },
      { label: this.literals['print'], action: () => alert('Ação Imprimir')},
      { label: this.literals['export'], action: () => alert('Exportando')},
      { label: this.literals['actions'], action: () => alert('Ação 2') }
    ];

    this.tableActions = [
      { action: this.editCustomer.bind(this), label: this.literals['edit'] },
    ];

    this.columns = [
      { column: 'id', label: this.literals['code'], type: 'string' },
      { column: 'name', label: this.literals['name'] , type: 'link', action: (value, row) => this.editCustomer(row) },
      { column: 'email', label: this.literals['email'], type: 'string' },
      { column: 'phone', label: this.literals['phone'], type: 'string' },
      { column: 'status', label: this.literals['influency'], type: 'label', width: '5%', labels: [
        { value: 'rebel', color: 'success', label: 'Rebel' },
        { value: 'tatooine', color: 'warning', label: 'Tattoine' },
        { value: 'galactic', color: 'danger', label: 'Galactic' }
      ]},
    ];

    this.breadcrumb = {
      items: [
        { label: this.literals['customers'], link: '/customers' }
      ]
    };

    this.filterSettings = {
      action: 'filterAction',
      ngModel: 'labelFilter',
      placeholder: this.literals['search']
    };
  }

}
