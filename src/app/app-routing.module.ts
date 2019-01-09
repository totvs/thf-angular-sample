import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThfPageDynamicTableComponent, ThfPageDynamicEditComponent, ThfPageDynamicDetailComponent } from '@totvs/thf-templates';

import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
  { path: 'new-customer', component: EditCustomerComponent },
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule' },
  { path: 'job-scheduler', loadChildren: 'app/job-scheduler/job-scheduler.module#JobSchedulerModule' },
  { path: 'customers-template/detail/:id', component: ThfPageDynamicDetailComponent,
    data: {
      serviceApi: 'http://localhost:3000/customers'
    }
  },
  { path: 'customers-template/edit/:id', component: ThfPageDynamicEditComponent,
    data: {
      serviceApi: 'http://localhost:3000/customers'
    }
  },
  { path: 'customers-template/new', component: ThfPageDynamicEditComponent,
    data: {
      serviceApi: 'http://localhost:3000/customers'
    }
  },
  { path: 'customers-template', component: ThfPageDynamicTableComponent,
    data: {
      serviceApi: 'http://localhost:3000/customers'
    }
  },
  { path: 'orders-template/detail/:id', component: ThfPageDynamicDetailComponent,
    data: {
      serviceApi: 'http://localhost:3000/orders'
    }
  },
  { path: 'orders-template/edit/:id', component: ThfPageDynamicEditComponent,
    data: {
      serviceApi: 'http://localhost:3000/orders'
    }
  },
  { path: 'orders-template/new', component: ThfPageDynamicEditComponent,
    data: {
      serviceApi: 'http://localhost:3000/orders'
    }
  },
  { path: 'orders-template', component: ThfPageDynamicTableComponent,
    data: {
      serviceApi: 'http://localhost:3000/orders'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
