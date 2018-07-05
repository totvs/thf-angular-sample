import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';
import { ThfI18nConfig, ThfI18nModule } from '@totvs/thf-ui/services/thf-i18n';

import { generalEn } from './literals/i18n/general-en';
import { generalPt } from './literals/i18n/general-pt';

import { AppComponent } from './app.component';
import { CustomersModule } from './customers/customers.module';
import { AppRoutingModule } from './app-routing.module';

const i18nConfig: ThfI18nConfig = {
  default: {
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'pt-BR': generalPt,
      'en-US': generalEn
    },
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CustomersModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ThfModule,
    ThfI18nModule.config(i18nConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
