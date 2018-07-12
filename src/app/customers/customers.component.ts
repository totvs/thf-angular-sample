import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfDisclaimer } from '@totvs/thf-ui/components/thf-disclaimer/thf-disclaimer.interface';
import { ThfDisclaimerGroup } from '@totvs/thf-ui/components/thf-disclaimer-group';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n/thf-i18n.service';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

import { CustomersService } from '../services/customers.service';
import { Customer } from './../shared/customer';
import { TotvsResponse } from './customers.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnDestroy, OnInit {

  cancelDeleteAction: ThfModalAction;
  confirmDeleteAction: ThfModalAction;

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

  @ViewChild('modalDeleteUser') modalDeleteUser: ThfModalComponent;

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private thfI18nService: ThfI18nService,
    public thfNotification: ThfNotificationService,
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

    this.getCustomers();

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

  private deleteCustomer() {
    const selectedCustomers = this.itemsFiltered.filter((customer: any) => customer.$selected);

    if (selectedCustomers.length > 0) {
      selectedCustomers.map(((customer: Customer) => {
        this.customersService.deleteCustomer(customer.id).subscribe(data => {
          this.getCustomers();
        });
      }));
      this.thfNotification.success(this.literals['excludedCustomer']);
    }
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

  private getCustomers() {
    this.customersSubscription = this.customersService.getCustomers().subscribe((customers: TotvsResponse<Customer>) => {
      this.items = customers.items;
      this.itemsFiltered = [...this.items];

      this.isLoading = false;
    });
  }

  private includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private onConfirmDelete() {
    this.modalDeleteUser.close();
    this.deleteCustomer();
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

    this.confirmDeleteAction = {
      action: () => this.onConfirmDelete(), label: this.literals['remove']
    };

    this.cancelDeleteAction = {
      action: () => this.modalDeleteUser.close(), label: this.literals['return']
    };

    this.pageActions = [
      { label: this.literals['addNewClient'], action: () => this.router.navigate(['/new-customer']), icon: 'thf-icon-plus' },
      { label: this.literals['print'], action: () => alert('Ação Imprimir')},
      { label: this.literals['export'], action: () => alert('Exportando')},
      { label: this.literals['remove'], action: () => this.modalDeleteUser.open()},
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
      { column: 'status', label: this.literals['influency'], type: 'label', width: '10%', labels: [
        { value: 'cloud', color: 'success', label: 'Cloud-Riders' },
        { value: 'crimson', color: 'warning', label: 'Crimson Dawn' },
        { value: 'galactic', color: 'success', label: 'Galactic' },
        { value: 'pyke', color: 'danger', label: 'Pyke Syndicate' }
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
