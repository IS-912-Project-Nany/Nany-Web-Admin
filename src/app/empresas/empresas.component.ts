import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../shared/model/company';
import { CompanyService } from '../shared/services/company.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .company-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./empresas.component.sass']
})
export class EmpresasComponent {
  companyDialog: boolean = false;
  companies: Company[] = [];
  company!: Company;
  selectedCompanies: Company[] = [];
  submitted: boolean = false;

  constructor(
    private companyService: CompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanies().then((data) => (this.companies = data));
  }

  openNew() {
    this.company = {};
    this.submitted = false;
    this.companyDialog = true;
  }

  deleteSelectedCompanies() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected companies?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companies = this.companies.filter(
          (val) => !this.selectedCompanies.includes(val)
        );
        this.selectedCompanies = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Companies Deleted',
          life: 3000,
        });
      },
    });
  }

  editCompany(company: Company) {
    this.company = { ...company };
    this.companyDialog = true;
  }

  deleteCompany(company: Company) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + company.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companies = this.companies.filter((val) => val.id !== company.id);
        this.company = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Company Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.companyDialog = false;
    this.submitted = false;
  }

  saveCompany() {
    this.submitted = true;

    if (this.company.name?.trim()) {
      if (this.company.id) {
        this.companies[this.findIndexById(this.company.id)] = this.company;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Company Updated',
          life: 3000,
        });
      } else {
        this.company.id = this.createId();
        this.company.logo = 'company-placeholder.svg';
        this.companies.push(this.company);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Company Created',
          life: 3000,
        });
      }

      this.companies = [...this.companies];
      this.companyDialog = false;
      this.company = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.companies.length; i++) {
      if (this.companies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
