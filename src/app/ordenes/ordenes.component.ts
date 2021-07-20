import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../shared/model/order';
import { OrderService } from '../shared/services/order.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .order-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./ordenes.component.sass']
})
export class OrdenesComponent {
  orderDialog: boolean = false;
  orders: Order[] = [];
  order!: Order;
  selectedOrders: Order[] = [];
  submitted: boolean = false;
  option: number=3;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().then((data) => (this.orders = data));
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  openNew() {
    this.order = {};
    this.submitted = false;
    this.orderDialog = true;
  }

  deleteSelectedOrder() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected orders?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orders = this.orders.filter(
          (val) => !this.selectedOrders.includes(val)
        );
        this.selectedOrders = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Orders Deleted',
          life: 3000,
        });
      },
    });
  }

  editOrder(order: Order) {
    this.order = { ...order };
    this.orderDialog = true;
  }

  deleteOrder(order: Order) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + order.numberOrder + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orders = this.orders.filter((val) => val.id !== order.id);
        this.order = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }

  saveOrder() {
    this.submitted = true;

    if (this.order.nameProduct?.trim()) {
      if (this.order.id) {
        this.orders[this.findIndexById(this.order.id)] = this.order;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Updated',
          life: 3000,
        });
      } else {
        this.order.id = this.createId();
        this.orders.push(this.order);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Created',
          life: 3000,
        });
      }

      this.orders = [...this.orders];
      this.orderDialog = false;
      this.order = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === id) {
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
