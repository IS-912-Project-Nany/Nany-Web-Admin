import { API_BASE_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  subirImagen(imagen): Observable<any> {
    return this.httpClient.post(`${API_BASE_URL}/upload`, imagen);
  }
}