import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfTableAction, ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n/thf-i18n.service';

import { ClientsService } from './services/clients.service';
import { Customer } from './../shared/customer';

@Component({
  selector: 'thf-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  actions: Array<ThfPageAction>;
  breadcrumb: ThfBreadcrumb;
  columns: Array<ThfTableColumn>;
  customerDetail: Array<ThfTableAction>;
  disclaimers = [];
  disclaimerGroup;
  filterSettings: ThfPageFilter;
  items: Array<any>;
  itemsFiltered: Array<any>;
  labelFilter = '';
  literals = {};
  subscription: Subscription;
  toolbarTitle: 'THF-CRUD';

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private thfI18nService: ThfI18nService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.thfI18nService.getLiterals()
    .subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.subscription = this.clientsService.getClients().subscribe(response => {
      this.items = response;
      this.itemsFiltered = [...this.items];
    });

    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
  }

  applyFilters(filters) {
    this.itemsFiltered = this.items.filter(item => {
      return Object.keys(item)
      .some(key => (!(item[key] instanceof Object) && this.includeFilter(item[key], filters)));
    });
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/edit', customer.id]);
  }

  filter() {
    const filters = this.disclaimers.map(disclaimer => disclaimer.value);
    if (this.itemsFiltered) {
      this.applyFilters(filters);
      if (this.labelFilter === '' || !this.disclaimers.length) {
        this.resetFilterHiringProcess();
      }
    }
  }

  filterAction() {
    this.populateDisclaimers([this.labelFilter]);
    this.filter();
  }

  getClients() {
    this.clientsService.getClients().subscribe(response => {
      this.items = response;
      this.itemsFiltered = [...this.items];
    });
  }

  includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  onChangeDisclaimer(disclaimers) {
    this.disclaimers = disclaimers;
    this.filter();
  }

  populateDisclaimers(filters: Array<any>) {
    this.disclaimers = filters.map(value => ({ value }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  resetFilterHiringProcess() {
    this.itemsFiltered = [...this.items];
    this.labelFilter = '';
  }

  setLiteralsDefaultValues() {
    this.actions = [
      { label: this.literals['addNewClient'], action: () => this.router.navigate(['/new-client']), icon: 'thf-icon-plus' },
      { label: this.literals['print'], action: () => alert('Ação Imprimir')},
      { label: this.literals['export'], action: () => alert('Exportando')},
      { label: this.literals['actions'], action: () => alert('Ação 2') }
    ];
    this.customerDetail = [
      { action: 'editCustomer', label: this.literals['edit'] },
    ];
    this.columns = [
      { column: 'id', label: this.literals['code'], type: 'string' },
      { column: 'name', label: this.literals['name'] , type: 'link', action: (value, row) => { this.editCustomer(row); } },
      { column: 'email', label: this.literals['email'], type: 'string' },
      { column: 'phone',  label: this.literals['phone'], type: 'string' },
      { column: 'status', label: this.literals['influency'], type: 'label', width: '5%', labels: [
        { value: 'rebel', color: 'success', label: 'Rebel' },
        { value: 'tatooine', color: 'warning', label: 'Tattoine' },
        { value: 'galactic', color: 'danger', label: 'Galactic' }
      ]},
    ];
    this.breadcrumb = {
      items: [
        { label: this.literals['clients'], link: '/clients' }
      ]
    };
    this.filterSettings = {
      action: 'filterAction',
      ngModel: 'labelFilter',
      placeholder: this.literals['search']
    };
  }

}
