import { Component, OnInit, Input} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  @Input() item: number;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Empresas', icon: 'pi pi-fw pi-briefcase', routerLink: ['/Empresas']},
      {label: 'Productos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/Productos']},
      {label: 'Motoristas', icon: 'pi pi-fw pi-key', routerLink: ['/Motoristas']},
      {label: 'Órdenes', icon: 'pi pi-fw pi-calendar', routerLink: ['/Ordenes']},
      {label: 'Nombre Usuario', icon: 'pi pi-fw pi-user'}
  ];

  this.activeItem = this.items[this.item];
  }

}
