import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui/components/thf-field';
import { ThfI18nService } from '@totvs/thf-ui/services/thf-i18n';
import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';

import { ClientsService } from './../services/clients.service';
import { Customer } from './../../shared/customer';

@Component({
  selector: 'thf-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  cancelDeleteAction: ThfModalAction;
  confirmDelete = false;
  confirmDeleteAction: ThfModalAction;
  customer: Customer = new Customer();
  editUserActions: Array<ThfPageAction>;
  editUserBreadcrumb: ThfBreadcrumb;
  literals = {};
  newUserActions: Array<ThfPageAction>;
  newUserBreadcrumb: ThfBreadcrumb;
  pageEditActions;
  personalityOptions: Array<ThfCheckboxGroupOption>;

  nationalityOptions: Array<ThfSelectOption> = [
    { label: 'Coruscant', value: 'coruscant' },
    { label: 'Death Star', value: 'deathstar' },
    { label: 'Kamino', value: 'kamino' },
    { label: 'Naboo', value: 'naboo' }
  ];

  statusOptions: Array<ThfSelectOption> = [
    { label: 'Rebel', value: 'rebel' },
    { label: 'Tattoine', value: 'tatooine' },
    { label: 'Galactic', value: 'galactic' }
  ];

  @ViewChild('modalDeleteUser') modalDeleteUser: ThfModalComponent;

  constructor(
    private clientsService: ClientsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private thfI18nService: ThfI18nService,
    public thfNotification: ThfNotificationService
  ) { }

  ngOnInit() {
    this.thfI18nService.getLiterals()
    .subscribe(literals => {
      this.literals = literals;
      this.setLiteralsDefaultValues();
    });
    this.getClient();
  }

  addClient(customer: Customer) {
    this.clientsService.addClient(customer).subscribe(() => {
      this.clientsService.getClients();
      this.router.navigate(['/clients']);
      this.thfNotification.success('Cliente cadastrado com sucesso.');
    });
  }

  deleteClient() {
    this.clientsService.deleteClient(this.customer.id).subscribe(data => {
      this.router.navigate(['/clients']);
      this.thfNotification.success('O cliente foi excluído.');
    });
  }

  getClient() {
    const id = this.route.snapshot.paramMap.get('id');
    const result = this.clientsService.getClient(id);
    if (id && result) {
      this.pageEditActions = true;
      result.subscribe(params => {
        this.customer = params;
      });
    }
  }

  onConfirmDelete() {
    this.confirmDelete = true;
    this.modalDeleteUser.close();
    this.deleteClient();
  }

  returnToHome(param: Function) {
    this.clientsService.getClients();
    this.router.navigate(['/clients']);
  }

  setLiteralsDefaultValues() {
    this.confirmDeleteAction = {
      action: () => this.onConfirmDelete(), label: this.literals['remove']
    };
    this.cancelDeleteAction = {
      action: () => this.modalDeleteUser.close(), label: this.literals['return']
    };
    this.editUserBreadcrumb = {
      items: [
        { label: this.literals['clients'], link: '/clients' },
        { label: this.literals['editClient'], link: '/clients/edit-client' }
      ]
    };
    this.newUserBreadcrumb = {
      items: [
        { label: this.literals['clients'], link: '/clients' },
        { label: this.literals['addNewClient'], link: '/clients/new-client' }
      ]
    };
    this.editUserActions = [
      { label: this.literals['saveClient'], action: this.updateClient.bind(this, this.customer), icon: 'thf-icon-plus' },
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
      { label: this.literals['saveClient'], action: this.addClient.bind(this, this.customer), icon: 'thf-icon-plus' },
      { label: this.literals['return'], action: () => this.location.back() }
    ];
  }

  updateClient() {
    this.clientsService.updateClient(this.customer).subscribe(() => {
      this.clientsService.getClients();
      this.router.navigate(['/clients']);
      this.thfNotification.success('Alteração efetuada com sucesso.');
    });
  }

}
