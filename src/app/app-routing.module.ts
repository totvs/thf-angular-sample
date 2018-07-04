import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'edit/:id', component: EditClientComponent },
  { path: 'new-client', component: EditClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
