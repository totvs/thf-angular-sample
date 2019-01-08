import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption, ThfLookupColumn } from '@totvs/thf-ui/components/thf-field';

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

  private orderId;
  private editedRowIndex: number;
  private literalsSubscription: Subscription;
  private ordersSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private thfI18nService: ThfI18nService,
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
    public customersService: CustomersService,
    public productsService: ProductsService,
    public thfNotification: ThfNotificationService
  ) {
    this.order.total = 0;
    this.order.items = [];
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.orderId = id;
      this.editOrder = true;
    }

    this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.statusOptions = this.orderStatusService.getStatusOptions();

    this.getOrder();
  }

  ngOnDestroy(): void {
    this.literalsSubscription.unsubscribe();
  }

  save() {
    if (this.editOrder) {
      this.ordersService.updateOrder(this.order)
        .subscribe(response => {
          this.router.navigate(['/orders']);
          this.thfNotification.success(this.literals['orderSucessfullyUpdated']);
        });
    } else {
      this.ordersService.addOrder(this.order)
        .subscribe(response => {
          this.router.navigate(['/orders']);
          this.thfNotification.success(this.literals['orderSucessfullyCreated']);
        });
    }
  }

  cancel() {
      this.router.navigate(['/orders']);
  }

  onSelected(product: Product, dataItem) {
    dataItem.productName = product.name;
    dataItem.unitPrice = product.price;
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
      this.order.items.push(dataItem);
    } else {
      this.order.items[rowIndex] = dataItem;
    }
    this.order.total += dataItem.unitPrice * dataItem.quantity;

    this.closeEditor(sender, rowIndex);
  }

  removeHandler({rowIndex}) {
    this.order.items.splice(rowIndex, 1);
  }

  closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
  }

  private getOrder() {
    if (this.orderId) {
      this.editOrder = true;
      this.ordersService.getOrder(this.orderId).subscribe((order: Order) => {
        this.order = order;
      });
    } else {
      this.editOrder = false;
      this.order.date = new Date();
      this.order.status = '1';
    }
  }

  private setLiteralsDefaultValues() {

    if (this.editOrder) {
      this.title = `${this.literals['editOrder']}${this.orderId}`;
      this.breadcrumb = {
        items: [
          { label: this.literals['orders'], link: '/orders' },
          { label: this.literals['edit'] }
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
