import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from '../model/order';
@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http
      .get<any>('../../assets/orders-test.json')
      .toPromise()
      .then((res) => <Order[]>res.data)
      .then((data) => {
        return data;
      });
  }
}