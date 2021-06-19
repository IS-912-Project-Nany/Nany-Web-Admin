import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'admin';
  logged = false;

  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
    this.items = [
        {label: 'Empresas', icon: 'pi pi-fw pi-briefcase'},
        {label: 'Productos', icon: 'pi pi-fw pi-shopping-cart'},
        {label: 'Motoristas', icon: 'pi pi-fw pi-key'},
        {label: 'Órdenes', icon: 'pi pi-fw pi-calendar'},
        {label: 'Nombre Usuario', icon: 'pi pi-fw pi-user'}
    ];

    this.activeItem = this.items[4];
  }
}
