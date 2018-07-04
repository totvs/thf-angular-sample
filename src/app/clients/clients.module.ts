import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { ClientsComponent } from './clients.component';
import { ClientsService } from './services/clients.service';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  imports: [
    CommonModule,
    ThfModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ClientsComponent,
    EditClientComponent
  ],
  exports: [
    ClientsComponent
  ],
  providers: [ClientsService],
})
export class ClientsModule { }
