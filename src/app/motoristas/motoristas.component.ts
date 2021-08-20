import { Component, OnInit, Input } from '@angular/core';
import { Motorista } from '../models/motorista';
import { MotoristasService } from '../services/motoristas.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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
  motoristaDialog: boolean = false;
  motoristas: Motorista[] = [];
  motorista!: Motorista;
  motoristaSeleccionado: Motorista[] = [];
  submitted: boolean = false;
  option: number=2;

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(
    private motoristasService: MotoristasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.motoristasService.obtenerMotoristas().subscribe(
      result=>{
        this.motoristas = result;
        console.log(this.motoristas);
      },
      error=> console.log(error)
    )
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  handleChange(e) {
    this.motorista.tipoUsuario.motoristaInfo.estadoAdmision = e.checked;
  }

  deleteSelectedMotorista() {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar estos motoristas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.motoristas = this.motoristas.filter(
          (val) => !this.motoristaSeleccionado.includes(val)
        );
        for (let i = 0; i < this.motoristaSeleccionado.length; i++) {
          this.motoristasService.eliminarMotorista(this.motoristaSeleccionado[i]._id).subscribe(
            result=>{
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Motoristas eliminados',
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

  editMotorista(motorista: Motorista) {
    this.motorista = { ...motorista };
    this.motoristaDialog = true;
  }

  deleteMotorista(motorista: Motorista) {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar este ' + motorista.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.motoristasService.eliminarMotorista(this.motorista._id).subscribe(
          result=>{
            this.motoristas = this.motoristas.filter((val) => val._id !== motorista._id);
            this.motorista = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Motorista eliminado',
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
    this.motoristaDialog = false;
    this.submitted = false;
  }

  saveMotorista() {
    this.submitted = true;

    if (this.motorista.nombre?.trim()) {
      if (this.motorista._id) {
        this.motoristas[this.findIndexById(this.motorista._id)] = this.motorista;
        console.log(this.motorista);
        let estado = {estadoAdmision: this.motorista.tipoUsuario.motoristaInfo.estadoAdmision};
        let data = {
          nombre: this.motorista.nombre,
          apellido: this.motorista.apellido,
          correo: this.motorista.correo
        };
        console.log(data);
        
        this.motoristasService.actualizarMotorista(this.motorista._id, estado).subscribe(
          result=>{
            console.log(result);
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Estado de motorista actualizado',
              life: 3000,
            });
            
            emailjs.send("service_r9lq1rs", "template_6glta8k", data, 'user_nqxC017pPSZMH26b8tVMc')
              .then((result: EmailJSResponseStatus) => {
                console.log(result.text);
              }, (error) => {
                console.log(error.text);
              });
          },
          error=>{
            console.log(error);
          }
        )
      }

      this.motoristas = [...this.motoristas];
      this.motoristaDialog = false;
      this.motorista = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.motoristas.length; i++) {
      if (this.motoristas[i]._id === id) {
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
