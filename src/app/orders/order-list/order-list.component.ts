import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfDisclaimerGroup } from '@totvs/thf-ui/components/thf-disclaimer-group';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';
import { ThfDisclaimer } from '@totvs/thf-ui/components/thf-disclaimer/thf-disclaimer.interface';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { Order } from '../../shared/order';
import { TotvsResponse } from '../../shared/totvs-response.interface';
import { OrdersService } from '../../services/orders.service';
import { OrderStatusService } from '../../services/order-status.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  advancedFilterPrimaryAction: ThfModalAction;
  statusOptions: Array<ThfSelectOption>;

  cancelDeleteAction: ThfModalAction;
  confirmDeleteAction: ThfModalAction;

  breadcrumb: ThfBreadcrumb;
  disclaimerGroup: ThfDisclaimerGroup;
  filterSettings: ThfPageFilter;

  pageActions: Array<ThfPageAction>;
  tableActions: Array<ThfPageAction>;

  columns: Array<ThfTableColumn>;
  items: Array<Order>;

  literals = {};
  orderStatus: string;
  isLoading: boolean = true;
  search: string;

  private disclaimers: Array<ThfDisclaimer> = [];
  private literalsSubscription: Subscription;
  private ordersSubscription: Subscription;
  private filter;

  @ViewChild('modalDelete') modalDelete: ThfModalComponent;
  @ViewChild('advancedFilterModal') advancedFilterModal: ThfModalComponent;

  constructor(
    private thfI18nService: ThfI18nService,
    private router: Router,
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
    public thfNotification: ThfNotificationService
  ) {
    this.filter = {
      search: null,
      status: null
    };
  }

  ngOnInit() {
    this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.statusOptions = this.orderStatusService.getStatusOptions();
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
    this.literalsSubscription.unsubscribe();
  }

  private getOrders() {
    this.isLoading = true;
    this.ordersSubscription = this.ordersService.getOrders(this.filter.search, this.filter.status)
    .subscribe((orders: TotvsResponse<Order>) => {
      this.items = orders.items;
      this.isLoading = false;
    });
  }

  private editOrder(order: Order) {
    this.router.navigate(['/orders/edit', order.id]);
  }

  filterAction() {
    this.addDisclaimer('search', this.search);
  }

  private addDisclaimer(property, value, label?) {
    const index = this.disclaimers.findIndex(item => item.property === property);
    let disclaimer: ThfDisclaimer;

    if (index < 0) {
      if (label) {
        disclaimer = {
          property: property,
          value: value,
          label: label
        };
      } else {
        disclaimer = {
          property: property,
          value: value
        };
      }
      this.disclaimers.push(disclaimer);
    } else {
      this.disclaimers[index].value = value;
      if (label) {
        this.disclaimers[index].label = label;
      }
    }

    this.disclaimerGroup.disclaimers = [...this.disclaimers];
  }

  private applyFilter() {
    this.filter.search = null;
    this.filter.status = null;

    this.disclaimers.forEach(item => {
      this.filter[item.property] = item.value;
    });

    this.getOrders();
  }

  private onChangeDisclaimer(disclaimers) {
    this.disclaimers = disclaimers;
    this.applyFilter();
  }

  private openDeleteModal() {
    const selectedOrders = this.items.filter((order: any) => order.$selected);

    if (selectedOrders.length > 0) {
          this.modalDelete.open();
    }
  }

  private onConfirmDelete() {
    this.modalDelete.close();
    this.deleteOrder();
  }

  private deleteOrder() {
    const selectedOrders = this.items.filter((order: any) => order.$selected);

    if (selectedOrders.length > 0) {
      selectedOrders.map(((order: Order) => {
        this.ordersService.deleteOrder(order.id).subscribe(data => {
          this.getOrders();
        });
      }));
      this.thfNotification.success(this.literals['deletedOrder']);
    }
  }

  advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }

  private setLiteralsDefaultValues() {

    this.disclaimerGroup = {
      title: this.literals['filters'],
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

    this.advancedFilterPrimaryAction = {
      action: () => {
        this.advancedFilterModal.close();
        const statusOptions = this.statusOptions.find(item => item.value === this.orderStatus);
        this.addDisclaimer('status', statusOptions.value, statusOptions.label);
      },
      label: this.literals['applyFilters']
    };

    this.pageActions = [
      { label: this.literals['addNewOrder'], action: () => this.router.navigate(['/orders/new']), icon: 'thf-icon-plus' },
      { label: this.literals['print'], action: () => alert('Ação Imprimir')},
      { label: this.literals['export'], action: () => alert('Exportando')},
      { label: this.literals['remove'], action: () => this.openDeleteModal()},
      { label: this.literals['actions'], action: () => alert('Ação 2') }
    ];

    this.filterSettings = {
      action: 'filterAction',
      advancedAction: 'advancedFilterActionModal',
      ngModel: 'search',
      placeholder: this.literals['search']
    };

    this.breadcrumb = {
      items: [
        { label: this.literals['orders'], link: '/orders' }
      ]
    };

    this.tableActions = [
      { action: this.editOrder.bind(this), label: this.literals['edit'] },
    ];

    this.columns = [
      { column: 'status', label: this.literals['status'], type: 'label', width: '10%', labels: [
        { value: '1', color: 'warning', label: this.literals['pending'] },
        { value: '2', color: 'danger', label: this.literals['cancelled'] },
        { value: '3', color: 'success', label: this.literals['completed'] }
      ]},
      { column: 'id', label: this.literals['code'], type: 'link', action: (value, row) => this.editOrder(row) },
      { column: 'customerName', label: this.literals['customer'], type: 'string'},
      { column: 'date', label: this.literals['date'], type: 'date' },
      { column: 'total', label: this.literals['total'], type: 'currency' }
    ];

    this.confirmDeleteAction = {
      action: () => this.onConfirmDelete(), label: this.literals['remove']
    };

    this.cancelDeleteAction = {
      action: () => this.modalDelete.close(), label: this.literals['return']
    };

  }
}
