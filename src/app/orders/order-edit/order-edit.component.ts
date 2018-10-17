import { Component, OnInit } from '@angular/core';
import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { OrdersService } from '../../services/orders.service';
import { OrderStatusService } from '../../services/order-status.service';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../shared/order';
import { CustomersService } from '../../services/customers.service';
import { ThfSelectOption, ThfLookupColumn } from '@totvs/thf-ui/components/thf-field';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  breadcrumb: ThfBreadcrumb;

  statusOptions: Array<ThfSelectOption>;
  customerColumns: Array<ThfLookupColumn>;

  title: string;
  literals = {};
  order: Order = new Order();
  editOrder: boolean = false;

  private literalsSubscription: Subscription;
  private ordersSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private thfI18nService: ThfI18nService,
    private ordersService: OrdersService,
    private orderStatusService: OrderStatusService,
    public customerService: CustomersService,
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

  }

}
