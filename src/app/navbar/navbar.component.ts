import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  @Input() item: number;

  constructor(
    private _route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Empresas',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/Empresas'],
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/Productos'],
      },
      {
        label: 'Motoristas',
        icon: 'pi pi-fw pi-key',
        routerLink: ['/Motoristas'],
      },
      {
        label: 'Órdenes',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/Ordenes'],
      },
      { label: 'Nombre Usuario', icon: 'pi pi-fw pi-user' },
      {
        icon: 'pi pi-power-off',
        command: (event) => {
          console.log('Cerrar Sesion');
          this.confirmationService.confirm({
            message: '¿Estas seguro que deseas cerrar la sesión?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this._route.navigate(['/']);
            },
          });
        },
      },
    ];
    this.activeItem = this.items[this.item];
  }
}
