import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<app-box-options *ngIf="!optSelected" (evento)="getOption($event)"></app-box-options>
            <app-motoristas *ngIf="optSelected"></app-motoristas>
            `
})
export class LoginComponent implements OnInit {
  optSelected: Boolean = false;
  constructor() {
    
  }
  ngOnInit(): void {
  }
  getOption(e) {
    console.log(e);
    this.optSelected = e;
    document.getElementById("body").style.backgroundColor = '#FFE9C7';
  }
}
