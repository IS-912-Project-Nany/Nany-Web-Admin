import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../model/product';
@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<any>('../../assets/products-test.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }
  /*
  generateProduct(): Product {
    const product: Product = {
      id: this.generateId(),
      name: this.generateName(),
      description: 'Product Description',
      price: this.generatePrice(),
      quantity: this.generateQuantity()
    };
    return product;
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }*/
}
