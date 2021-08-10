import { API_BASE_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  constructor(private httpClient: HttpClient) {}

  // Obtener categorias
  obtenerCategorias(): Observable<any> {
    return this.httpClient.get(`${API_BASE_URL}/categorias`);
  }
  
  // CRUD Empresas
  crearEmpresa(idCategoria: String, empresa: any): Observable<any> {
    return this.httpClient.post(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas`,
      empresa
    );
  }

  obtenerEmpresas(idCategoria: String): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas`
    );
  }

  obtenerEmpresa(idCategoria: String, idEmpresa: String): Observable<any> {
    return this.httpClient.get(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}`
    );
  }

  actualizarEmpresa(
    idCategoria: String,
    idEmpresa: String,
    empresa: any
  ): Observable<any> {
    return this.httpClient.put(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}`,
      empresa
    );
  }

  borrarEmpresa(idCategoria: String, idEmpresa: String): Observable<any> {
    return this.httpClient.delete(
      `${API_BASE_URL}/categorias/${idCategoria}/empresas/${idEmpresa}`
    );
  }
}
