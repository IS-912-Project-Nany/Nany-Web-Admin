import { API_BASE_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private httpClient: HttpClient) {}

  crearProducto(
    idCategoria: String,
    idEmpresa: String,
    producto: any
  ): Observable<any> {
    return this.httpClient.post(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}/productos`,
      producto
    );
  }

  obtenerProductos(idCategoria: String, idEmpresa: String): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}//categorias/${idCategoria}/empresas/${idEmpresa}/productos`
    );
  }

  obtenerProducto(
    idCategoria: String,
    idEmpresa: String,
    idProducto: String
  ): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}/productos/${idProducto}`
    );
  }

  actualizarProducto(
    idCategoria: String,
    idEmpresa: String,
    idProducto: String,
    producto: any
  ): Observable<any> {
    return this.httpClient.put(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}/productos/${idProducto}`,
      producto
    );
  }

  borrarProducto(
    idCategoria: String,
    idEmpresa: String,
    idProducto: String
  ): Observable<any> {
    return this.httpClient.delete(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}/productos/${idProducto}`
    );
  }
}
