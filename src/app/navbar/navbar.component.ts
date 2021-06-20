import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Empresas', icon: 'pi pi-fw pi-briefcase'},
      {label: 'Productos', icon: 'pi pi-fw pi-shopping-cart'},
      {label: 'Motoristas', icon: 'pi pi-fw pi-key'},
      {label: 'Órdenes', icon: 'pi pi-fw pi-calendar'},
      {label: 'Nombre Usuario', icon: 'pi pi-fw pi-user'}
  ];

  this.activeItem = this.items[1];
  }

}
