import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThfModule } from '@totvs/thf-ui';

import { GridModule } from '@progress/kendo-angular-grid';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from '../services/orders.service';
import { OrderStatusService } from '../services/order-status.service';
import { ProductsService } from '../services/products.service';
import { CustomersService } from '../services/customers.service';

@NgModule({
  imports: [
    ThfModule,
    FormsModule,
    CommonModule,
    GridModule,
    OrdersRoutingModule
  ],
  declarations: [OrderEditComponent, OrderListComponent],
  providers: [OrdersService, OrderStatusService, CustomersService, ProductsService]
})
export class OrdersModule { }
