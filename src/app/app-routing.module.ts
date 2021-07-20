import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Categorias', component: CategoriasComponent},
  {path: 'Empresas', component: EmpresasComponent},
  {path: 'Ordenes', component: OrdenesComponent},
  {path: 'Motoristas', component: MotoristasComponent},
  {path: 'Productos', component: ProductosComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
