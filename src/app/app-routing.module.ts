import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
  { path: 'new-customer', component: EditCustomerComponent },
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
