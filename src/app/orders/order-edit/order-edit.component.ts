import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption, ThfLookupColumn } from '@totvs/thf-ui/components/thf-field';
import { ThfGridColumn } from '@totvs/thf-ui/components/thf-grid';

import { Order } from '../../shared/order';
import { OrderItem } from '../../shared/order-item';
import { OrdersService } from '../../services/orders.service';
import { CustomersService } from '../../services/customers.service';
import { ProductsService } from '../../services/products.service';
import { OrderStatusService } from '../../services/order-status.service';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  breadcrumb: ThfBreadcrumb;

  statusOptions: Array<ThfSelectOption>;
  customerColumns: Array<ThfLookupColumn>;
  productColumns: Array<ThfLookupColumn>;

  title: string;
  literals = {};
  order: Order = new Order();
  editOrder: boolean = false;
  items: Array<Object> = [];

  private editedRowIndex: number;
  private literalsSubscription: Subscription;
  private ordersSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private thfI18nService: ThfI18nService,
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
    public customersService: CustomersService,
    public productsService: ProductsService,
    public thfNotification: ThfNotificationService
  ) { }

  ngOnInit() {
    this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.statusOptions = this.orderStatusService.getStatusOptions();

    this.getOrder();
  }

  ngOnDestroy(): void {
    // this.ordersSubscription.unsubscribe();
    this.literalsSubscription.unsubscribe();
  }

  onSelected(product: Product, dataItem) {
    dataItem.productName = product.name;
  }

  addHandler({sender}, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);

    sender.addRow(new OrderItem({
      quantity: 0,
      unitPrice: 0
    }));
  }

  editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex);
  }

  cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  saveHandler({sender, rowIndex, dataItem, isNew}) {

    if (isNew) {
      this.items.push(dataItem);
    } else {
      this.items[rowIndex] = dataItem;
    }

    this.closeEditor(sender, rowIndex);
  }

  removeHandler({rowIndex}) {
    this.items.splice(rowIndex, 1);
  }

  closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
  }

  private getOrder() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.editOrder = true;
      this.ordersService.getOrder(id).subscribe((order: Order) => {
        this.order = order;
      });
    } else {
      this.editOrder = false;
      this.order.date = new Date();
      this.order.status = '1';
    }
  }

  private setLiteralsDefaultValues() {

    // this.pageActions = [
    //   { label: this.literals['addNewOrder'], action: () => this.router.navigate(['/orders/new']), icon: 'thf-icon-plus' },
    //   { label: this.literals['print'], action: () => alert('Ação Imprimir')},
    //   { label: this.literals['export'], action: () => alert('Exportando')},
    //   { label: this.literals['remove'], action: () => this.modalDelete.open()},
    //   { label: this.literals['actions'], action: () => alert('Ação 2') }
    // ];

    if (this.editOrder) {
      this.title = this.literals['order'];
      this.breadcrumb = {
        items: [
          { label: this.literals['orders'], link: '/orders' },
          { label: this.literals['new'] }
        ]
      };
    } else {
      this.title = this.literals['newOrder'];
      this.breadcrumb = {
        items: [
            { label: this.literals['orders'], link: '/orders' },
            { label: this.literals['new'] }
          ]
        };
    }

    this.customerColumns = [
      {
        label: this.literals['code'],
        column: 'id'
      },
      {
        label: this.literals['name'],
        column: 'name'
      }
    ];

    this.productColumns = [
      {
        label: this.literals['code'],
        column: 'id'
      },
      {
        label: this.literals['name'],
        column: 'name'
      }
    ];

  }

}
