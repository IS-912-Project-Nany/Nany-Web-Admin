import { Component, OnInit, Input } from '@angular/core';
import { Orden } from '../models/orden';
import { ConfirmationService } from 'primeng/api';
import { OrdenesService } from '../services/ordenes.service';
import { MessageService } from 'primeng/api';
import { MotoristasService } from '../services/motoristas.service';

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
  ordenDialog: boolean = false;
  ordenes: Orden[] = [];
  orden!: Orden;
  ordenSeleccionada: Orden[] = [];
  listaMotoristas: [];
  submitted: boolean = false;
  option: number=3;

  constructor(
    private ordenesService: OrdenesService,
    private motoristasService: MotoristasService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.ordenesService.obtenerOrdenes().subscribe(
      (result)=>{
        this.ordenes = result;
        console.log(result);
      },
      (error)=>{
        console.log(error);
      }
    );

    this.motoristasService.obtenerMotoristas().subscribe(
      result=>{
        this.listaMotoristas = result;
        console.log(result);
      },
      error=> console.log(error)
    )
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  deleteSelectedOrdenes() {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar estas ordenes?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordenes = this.ordenes.filter(
          (val) => !this.ordenSeleccionada.includes(val)
        );
        for (let i = 0; i < this.ordenSeleccionada.length; i++) {
          this.ordenesService.eliminarOrden(this.ordenSeleccionada[i]._id).subscribe(
            result=>{
              this.ordenSeleccionada = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Ordenes eliminadas',
                life: 3000,
              });
            },
            error=>{
              console.log(error);
            }
          )
          
        }
      },
    });
  }

  editOrden(orden: Orden) {
    this.orden = { ...orden };
    this.ordenDialog = true;
  }

  deleteOrden(orden: Orden) {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar esta orden numero ' + orden.numOrden + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordenesService.eliminarOrden(orden._id).subscribe(
          result=>{
            this.ordenes = this.ordenes.filter((val) => val._id !== orden._id);
            this.orden = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Orden eliminada',
              life: 3000,
            });
          },
          error=>{
            console.log(error);
          }
        )
      },
    });
  }

  hideDialog() {
    this.ordenDialog = false;
    this.submitted = false;
  }

  saveOrden() {
    this.submitted = true;

    if (this.orden.numOrden?.trim()) {
      if (this.orden._id) {
        this.ordenes[this.findIndexById(this.orden._id)] = this.orden;
        this.orden.tipoEstado = {
          idEstado: "1",
          nombreEstado: "En camino"
        };
        this.ordenesService.actualizarOrden(this.orden._id, this.orden).subscribe(
          result=>{
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Orden actualizada',
              life: 3000,
            });
          },
          error => {
            console.log(error);
          }
        )
      } 

      this.ordenes = [...this.ordenes];
      this.ordenDialog = false;
      this.orden = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.ordenes.length; i++) {
      if (this.ordenes[i]._id === id) {
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
