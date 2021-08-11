import { API_BASE_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private httpClient: HttpClient) { }

  obtenerOrdenes():Observable<any>{
    return this.httpClient.get(`${API_BASE_URL}/ordenes`);
  }

  obtenerOrden(idOrden: String):Observable<any>{
    return this.httpClient.get(`${API_BASE_URL}/ordenes/${idOrden}`);
  }

  crearOrden(orden: any):Observable<any>{
    return this.httpClient.post(`${API_BASE_URL}/ordenes`, orden);
  }

  actualizarOrden(idOrden: String, motorista: any):Observable<any>{
    return this.httpClient.put(`${API_BASE_URL}/ordenes/${idOrden}`, motorista);
  }

  eliminarOrden(idOrden: String):Observable<any>{
    return this.httpClient.delete(`${API_BASE_URL}/ordenes/${idOrden}`);
  }
}
