import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Carrier } from '../model/carrier';
@Injectable()
export class CarrierService {

  constructor(private http: HttpClient) {}

  getCarriers() {
    return this.http
      .get<any>('')
      .toPromise()
      .then((res) => <Carrier[]>res.data)
      .then((data) => {
        return data;
      });
  }
}