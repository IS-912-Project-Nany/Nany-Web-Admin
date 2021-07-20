import { Component, OnInit, Input } from '@angular/core';
import { Carrier } from '../shared/model/carrier';
import { CarrierService } from '../shared/services/carrier.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .carrier-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./motoristas.component.sass']
})
export class MotoristasComponent {
  carrierDialog: boolean = false;
  carriers: Carrier[] = [];
  carrier!: Carrier;
  selectedCarriers: Carrier[] = [];
  submitted: boolean = false;
  option: number=2;

  constructor(
    private carrierService: CarrierService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.carrierService.getCarriers().then((data) => (this.carriers = data));
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  openNew() {
    this.carrier = {};
    this.submitted = false;
    this.carrierDialog = true;
  }

  deleteSelectedCarrier() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected carriers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carriers = this.carriers.filter(
          (val) => !this.selectedCarriers.includes(val)
        );
        this.selectedCarriers = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Carriers Deleted',
          life: 3000,
        });
      },
    });
  }

  editCarrier(carrier: Carrier) {
    this.carrier = { ...carrier };
    this.carrierDialog = true;
  }

  deleteCarrier(carrier: Carrier) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + carrier.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carriers = this.carriers.filter((val) => val.id !== carrier.id);
        this.carrier = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Carrier Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.carrierDialog = false;
    this.submitted = false;
  }

  saveCarrier() {
    this.submitted = true;

    if (this.carrier.name?.trim()) {
      if (this.carrier.id) {
        this.carriers[this.findIndexById(this.carrier.id)] = this.carrier;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Carrier Updated',
          life: 3000,
        });
      } else {
        this.carrier.id = this.createId();
        this.carriers.push(this.carrier);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Carrier Created',
          life: 3000,
        });
      }

      this.carriers = [...this.carriers];
      this.carrierDialog = false;
      this.carrier = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.carriers.length; i++) {
      if (this.carriers[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
