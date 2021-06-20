import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<app-box-options *ngIf="!optSelected" (evento)="getOption($event)"></app-box-options>
            <app-productos *ngIf="optSelected"></app-productos>
            `
})
export class LoginComponent implements OnInit {
  optSelected: Boolean = false;
  constructor() {
    console.log(this.optSelected);
  }

  ngOnInit(): void {
  }
  getOption(e) {
    console.log(e);
    this.optSelected = e;
  }


}
