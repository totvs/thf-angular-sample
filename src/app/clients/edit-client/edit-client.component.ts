import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb/thf-breadcrumb.interface';
import { ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui/components/thf-field';
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

  customer: Customer = new Customer();
  confirmDelete = false;
  pageEditActions;

  public readonly confirmDeleteAction: ThfModalAction = {
    action: () => this.onConfirmDelete(), label: 'Deletar'
  };

  public readonly cancelDeleteAction: ThfModalAction = {
    action: () => this.modalDeleteUser.close(), label: 'Cancelar'
  };

  public readonly editUserActions: Array<ThfPageAction> = [
    { label: 'Salvar Cliente', action: this.updateClient.bind(this, this.customer), icon: 'thf-icon-plus' },
    { label: 'Deletar', action: () => this.modalDeleteUser.open() },
    { label: 'Voltar', action: () => this.location.back() }
  ];

  public readonly editUserBreadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Clientes', link: '/clients' },
      { label: 'Editar Cliente', link: '/clients/edit-client' }
    ]
  };

  public readonly modalPrimaryAction: ThfModalAction = {
    action: () => this.returnToHome(() => this.formModal.close()),
    label: 'Fechar'
  };

  public readonly nationalityOptions: Array<ThfSelectOption> = [
    { label: 'Coruscant', value: 'coruscant' },
    { label: 'Death Star', value: 'deathstar' },
    { label: 'Kamino', value: 'kamino' },
    { label: 'Naboo', value: 'naboo' }
  ];

  public readonly newUserActions: Array<ThfPageAction> = [
    { label: 'Adicionar Cliente', action: this.addClient.bind(this, this.customer), icon: 'thf-icon-plus' },
    { label: 'Voltar', action: () => this.location.back() }
  ];

  public readonly newUserBreadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Clientes', link: '/clients' },
      { label: 'Adicionar Cliente', link: '/clients/new-client' }
    ]
  };

  public readonly personalityOptions: Array<ThfCheckboxGroupOption> = [
    { value: 'Crafter', label: 'Crafter' },
    { value: 'Inventor', label: 'Inventor' },
    { value: 'Protetor', label: 'Protetor' },
    { value: 'Controlador', label: 'Controlador' },
    { value: 'Performer', label: 'Performer' },
    { value: 'Idealista', label: 'Idealista' }
  ];

  public readonly statusOptions: Array<ThfSelectOption> = [
    { label: 'Rebel', value: 'rebel' },
    { label: 'Tattoine', value: 'tatooine' },
    { label: 'Galactic', value: 'galactic' }
  ];

  @ViewChild('modalDeleteUser') modalDeleteUser: ThfModalComponent;

  @ViewChild('formModal') formModal: ThfModalComponent;

  constructor(
    private clientsService: ClientsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public thfNotification: ThfNotificationService
  ) { }

  ngOnInit() {
    this.getClient();
  }

  addClient(customer: Customer) {
    this.clientsService.addClient(customer);
    this.formModal.open();
  }

  deleteClient() {
    this.clientsService.deleteClient(this.customer.id).subscribe(data => {
      this.router.navigate(['/clients']);
      this.thfNotification.success('O usuário foi excluído.');
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

  updateClient() {
    this.route.params.subscribe(params => {
      this.clientsService.updateClient(this.customer);
      this.router.navigate(['/clients']);
      this.thfNotification.success('Alteração efetuada com sucesso.');
    });
  }

}
