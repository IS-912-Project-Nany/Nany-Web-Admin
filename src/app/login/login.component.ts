import { Component, OnInit,} from '@angular/core';
import { BoxOptionsComponent } from './box-options/box-options.component';

@Component({
  selector: 'app-login',
  template: `<app-box-options></app-box-options>`
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
