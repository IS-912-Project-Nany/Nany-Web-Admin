import { Component } from '@angular/core';
import { Empresa } from '../models/empresa';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmpresasService } from '../services/empresas.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .company-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./empresas.component.sass'],
})
export class EmpresasComponent {
  categorias: any = [];
  categoriaSeleccionada: any;
  empresas: Empresa[] = [];
  empresaSeleccionada: Empresa[] = [];
  empresa!: Empresa;
  empresaDialog: boolean = false;
  submitted: boolean = false;
  option: number = 0;
  uploadedFiles: any[] = [];
  formData = new FormData();

  constructor(
    private empresasService: EmpresasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.empresasService.obtenerCategorias().subscribe(
      (result) => {
        this.categorias = result;
        this.categorias.forEach(categoria => {
          categoria.empresas.forEach(empresa => {
            empresa.idCategoria = categoria._id;
            empresa.nombreCategoria = categoria.nombre;
            this.empresas.push(empresa);
          });
        });
        console.log(result);
        console.log(this.empresas);
      },
      (error) => {
        console.log(error);
      }
    );
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  openNew() {
    this.empresa = {};
    this.submitted = false;
    this.empresaDialog = true;
  }

   deleteSelectedCompanies() {
     this.confirmationService.confirm({
       message: '¿Estas seguro que quieres eliminar estas empresa?',
       header: 'Confirmar',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
         this.empresas = this.empresas.filter(
           (val) => !this.empresaSeleccionada.includes(val)
         );
         
         for (let i = 0; i < this.empresaSeleccionada.length; i++) {
          this.empresasService.borrarEmpresa(this.empresaSeleccionada[i].idCategoria, this.empresaSeleccionada[i]._id).subscribe(
            result => {
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Empresa Eliminada',
                life: 3000,
              });
            },
            error => {
              console.log(error);
            }
          );
         }
       },
     });
   }

  editCompany(empresa: Empresa) {
    this.empresa = { ...empresa };
    this.empresaDialog = true;
  }

  deleteCompany(empresa: Empresa) {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar esta empresa ' + empresa.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.empresasService.borrarEmpresa(empresa.idCategoria, empresa._id).subscribe(
          result => {
            this.empresas = this.empresas.filter((val) => val._id !== empresa._id);
            this.empresa = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Empresa eliminada',
              life: 3000,
            });
          },
          error => {
            console.log(error);
          }
        );
      },
    });
  }

  hideDialog() {
    this.empresaDialog = false;
    this.submitted = false;
  }

saveCompany() {
  this.submitted = true;

  if (this.empresa.nombre?.trim()) {
    if (this.empresa._id) {
      this.empresas[this.findIndexById(this.empresa._id)] = this.empresa;
      this.empresasService.actualizarEmpresa(this.empresa.idCategoria, this.empresa._id, this.empresa).subscribe(
        result => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Empresa Modificada',
            life: 3000,
          });
        },
        error => {
          console.log(error);
        }
      );
     
    } else {
      let empresaAgregar = this.empresa;
      this.empresasService.crearEmpresa(this.categoriaSeleccionada._id, this.empresa).subscribe(
        result => {
          console.log(result);
          this.empresas.push(empresaAgregar);
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Empresa creada',
            life: 3000,
          });
        },
        error => {
          console.log(error);
        }
      )
    }

    this.empresas = [...this.empresas];
    this.empresaDialog = false;
    this.empresa = {};
  }
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.empresas.length; i++) {
      if (this.empresas[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onUpload(event,tipo) {
    for(let file of event.files) {
      console.log(this.uploadedFiles);
      this.uploadedFiles.push(file);
      this.formData.append("imagen", file);
      this.formData.append("folder", 'empresas')
      this.uploadService.subirImagen(this.formData).subscribe(
        result => {
          if (tipo == 'banner') {
            this.empresa.banner = result.url;
            this.messageService.add({severity: 'info', summary: 'Banner Subido'});
          } else {
            this.empresa.logo = result.url;
            this.messageService.add({severity: 'info', summary: 'Logo Subido'});
          }
          console.log(result)
          this.uploadedFiles = [];
          this.formData.delete("imagen");
          this.formData.delete("folder"); 
        },
        error => {
         console.log(error);
        }
      );
    }
  }
}
