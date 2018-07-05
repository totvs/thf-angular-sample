import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { CustomersComponent } from './customers.component';
import { CustomersService } from '../services/customers.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

@NgModule({
  imports: [
    CommonModule,
    ThfModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    CustomersComponent,
    EditCustomerComponent
  ],
  exports: [
    CustomersComponent
  ],
  providers: [CustomersService],
})
export class CustomersModule { }
