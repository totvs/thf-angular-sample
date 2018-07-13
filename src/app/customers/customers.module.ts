import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { CustomersComponent } from './customers.component';
import { CustomerFormGroupService } from './customer-form-group.service';
import { CustomersLookupService } from '../services/costumers-lookup.service';
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
  providers: [CustomersLookupService, CustomersService, CustomerFormGroupService],
})
export class CustomersModule { }
