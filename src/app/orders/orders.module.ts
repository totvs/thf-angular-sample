import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfModule } from '@totvs/thf-ui';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from '../services/orders.service';
import { OrderStatusService } from '../services/order-status.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThfModule,
    FormsModule,
    CommonModule,
    OrdersRoutingModule
  ],
  declarations: [OrderEditComponent, OrderListComponent],
  providers: [OrdersService, OrderStatusService]
})
export class OrdersModule { }
