import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductosService } from '../services/productos.service';
import { EmpresasService } from '../services/empresas.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./productos.component.sass'],
})
export class ProductosComponent {
  categorias: any = [];
  categoriaSeleccionada: any;
  empresas: any = [];
  empresaSeleccionada: any;
  productosDialog: boolean = false;
  productos: Producto[] = [];
  producto!: Producto;
  productoSeleccionado: Producto[] = [];
  submitted: boolean = false;
  option: number = 1;
  uploadedFiles: any[] = [];
  formData = new FormData();

  constructor(
    private productosService: ProductosService,
    private empresasService: EmpresasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.empresasService.obtenerCategorias().subscribe(
      (result) => {
        this.categorias = result;
        this.categorias.forEach(categoria => {
          categoria.empresas.forEach(empresa => {
            empresa.idCategoria = categoria._id;
            empresa.nombreCategoria = categoria.nombre;
            this.empresas.push(empresa);
            empresa.productos.forEach(producto => {
              producto.idCategoria = categoria._id;
              producto.nombreCategoria = categoria.nombre;
              producto.idEmpresa = empresa._id;
              producto.nombreEmpresa = empresa.nombre; 
              this.productos.push(producto);
            });
          });
        });
        console.log("Categorias", this.categorias);
        console.log("Empresas", this.empresas);
        console.log("Productos", this.productos);
      },
      (error) => {
        console.log(error);
      }
    );
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  openNew() {
    this.producto = {};
    this.submitted = false;
    this.productosDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar estos productos?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productos = this.productos.filter(
          (val) => !this.productoSeleccionado.includes(val)
        );
        for (let i = 0; i < this.productoSeleccionado.length; i++) {
          this.productosService.borrarProducto(
            this.productoSeleccionado[i].idCategoria,
            this.productoSeleccionado[i].idEmpresa,
            this.productoSeleccionado[i]._id
          )
          .subscribe(
            result => {
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Producto eliminado',
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

  editProduct(producto: Producto) {
    this.producto = { ...producto };
    this.productosDialog = true;
  }

  deleteProduct(producto: Producto) {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar este producto ' + producto.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productosService.borrarProducto(producto.idCategoria, producto.idEmpresa, producto._id).subscribe(
          result => {
            this.productos = this.productos.filter((val) => val._id !== producto._id);
            this.producto = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Producto eliminado',
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
    this.productosDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.producto.nombre?.trim()) {
      if (this.producto._id) {
        this.productos[this.findIndexById(this.producto._id)] = this.producto;
        this.productosService.actualizarProducto(this.producto.idCategoria, this.producto.idEmpresa, this.producto._id, this.producto).subscribe(
          result => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Producto modificado',
              life: 3000,
            });
          },
          error => {
            console.log(error);
          }
        );
      } else {
        let producto = this.producto;
        producto.nombreCategoria = this.categoriaSeleccionada.nombre;
        producto.nombreEmpresa = this.empresaSeleccionada.nombre;
        this.productosService.crearProducto(this.categoriaSeleccionada._id, this.empresaSeleccionada._id, this.producto).subscribe(
          result => {
            console.log(result);
            this.productos.push(producto);
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Producto creado',
              life: 3000,
            });
          },
          error => {
            console.log(error);
          }
        );
        console.log("Producto", this.producto);
      }

      this.productos = [...this.productos];
      this.productosDialog = false;
      this.producto = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onUpload(event) {
    let file: File = event.files[0];
    console.log(file);
    this.uploadedFiles.push(file);
    this.formData.append("imagen", file);
    this.formData.append("folder", 'usuarios');

    this.uploadService.subirImagen(this.formData).subscribe(
      result => {
        console.log(result);
        this.producto.imagen = result.url;
        this.messageService.add({severity: 'info', summary: 'Imagen Subida'});
      },
      error => {
        console.log(error);
      }
    );}
}
