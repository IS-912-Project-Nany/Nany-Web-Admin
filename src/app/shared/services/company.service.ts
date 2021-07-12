import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from '../model/company';
@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http
      .get<any>('../../assets/companies-test.json')
      .toPromise()
      .then((res) => <Company[]>res.data)
      .then((data) => {
        return data;
      });
  }
}