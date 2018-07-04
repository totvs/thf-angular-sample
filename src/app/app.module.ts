import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ThfModule,
    ClientsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
