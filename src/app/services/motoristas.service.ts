import { API_BASE_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {

  constructor(private httpClient: HttpClient) { }

  obtenerMotoristas(idMotorista: String):Observable<any>{
    return this.httpClient.get(`${API_BASE_URL}/usuarios/motoristas/${idMotorista}`);
  }

  //Actualizar el estado de un motorista
  actualizarMotorista(idMotorista: String, estado: any):Observable<any>{
    return this.httpClient.put(`${API_BASE_URL}/usuarios/motoristas/${idMotorista}`, estado);
  }

  eliminarMotorista(idMotorista: String):Observable<any>{
    return this.httpClient.delete(`${API_BASE_URL}/usuarios/motoristas/${idMotorista}`);
  }

}
