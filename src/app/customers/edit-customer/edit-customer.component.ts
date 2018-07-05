import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui/components/thf-field';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';

import { CustomersService } from '../../services/customers.service';
import { Customer } from './../../shared/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnDestroy {

  cancelDeleteAction: ThfModalAction;
  confirmDeleteAction: ThfModalAction;

  editUserBreadcrumb: ThfBreadcrumb;
  newUserBreadcrumb: ThfBreadcrumb;

  editUserActions: Array<ThfPageAction>;
  newUserActions: Array<ThfPageAction>;

  confirmDelete = false;
  customer: Customer = new Customer();
  literals = {};
  isPageEdit: boolean;
  personalityOptions: Array<ThfCheckboxGroupOption>;

  readonly nationalityOptions: Array<ThfSelectOption> = [
    { label: 'Coruscant', value: 'coruscant' },
    { label: 'Death Star', value: 'deathstar' },
    { label: 'Kamino', value: 'kamino' },
    { label: 'Naboo', value: 'naboo' }
  ];

  readonly statusOptions: Array<ThfSelectOption> = [
    { label: 'Rebel', value: 'rebel' },
    { label: 'Tattoine', value: 'tatooine' },
    { label: 'Galactic', value: 'galactic' }
  ];

  private literalsSubscription: Subscription;

  @ViewChild('modalDeleteUser') modalDeleteUser: ThfModalComponent;

  constructor(
    private customersService: CustomersService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private thfI18nService: ThfI18nService,
    public thfNotification: ThfNotificationService
  ) { }

  ngOnDestroy() {
    this.literalsSubscription.unsubscribe();
  }

  ngOnInit() {

    this.literalsSubscription = this.thfI18nService.getLiterals().subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });

    this.getCustomer();
  }

  private addCustomer(customer: Customer) {
    this.customersService.addCustomer(customer).subscribe(() => {
      this.router.navigate(['/customers']);
      this.thfNotification.success('Cliente cadastrado com sucesso.');
    });
  }

  private deleteCustomer() {
    this.customersService.deleteCustomer(this.customer.id).subscribe(data => {
      this.router.navigate(['/customers']);
      this.thfNotification.success('O cliente foi excluído.');
    });
  }

  private getCustomer() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isPageEdit = true;

      this.customersService.getCustomer(id).subscribe((customer: Customer) => {
        this.customer = customer;
      });
    }
  }

  private onConfirmDelete() {
    this.confirmDelete = true;
    this.modalDeleteUser.close();
    this.deleteCustomer();
  }

  private setLiteralsDefaultValues() {
    this.confirmDeleteAction = {
      action: () => this.onConfirmDelete(), label: this.literals['remove']
    };

    this.cancelDeleteAction = {
      action: () => this.modalDeleteUser.close(), label: this.literals['return']
    };

    this.editUserBreadcrumb = {
      items: [
        { label: this.literals['customers'], link: '/customers' },
        { label: this.literals['editClient'], link: '/customers/edit-customer' }
      ]
    };

    this.newUserBreadcrumb = {
      items: [
        { label: this.literals['customers'], link: '/customers' },
        { label: this.literals['addNewClient'], link: '/customers/new-customer' }
      ]
    };

    this.editUserActions = [
      { label: this.literals['saveClient'], action: this.updateCustomer.bind(this, this.customer), icon: 'thf-icon-plus' },
      { label: this.literals['return'], action: () => this.location.back() },
      { label: this.literals['print'], action: () => alert('Imprimir') },
      { label: this.literals['remove'], action: () => this.modalDeleteUser.open() },
    ];

    this.personalityOptions = [
      { value: 'Crafter', label: this.literals['crafter'] },
      { value: 'Inventor', label: this.literals['inventor'] },
      { value: 'Protetor', label: this.literals['protector'] },
      { value: 'Controlador', label: this.literals['controller'] },
      { value: 'Performer', label: this.literals['performer'] },
      { value: 'Idealista', label: this.literals['idealist'] }
    ];

    this.newUserActions = [
      { label: this.literals['saveClient'], action: this.addCustomer.bind(this, this.customer), icon: 'thf-icon-plus' },
      { label: this.literals['return'], action: () => this.location.back() }
    ];
  }

  private updateCustomer() {
    this.customersService.updateCustomer(this.customer).subscribe(() => {
      this.router.navigate(['/customers']);
      this.thfNotification.success('Alteração efetuada com sucesso.');
    });
  }

}
