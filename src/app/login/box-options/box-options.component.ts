import { Component } from '@angular/core';

@Component({
  selector: 'app-box-options',
  templateUrl: './box-options.component.html',
})
export class BoxOptionsComponent {
  isLogged: Boolean = false;

  constructor() {}

  login() {
    this.isLogged = true;
    document.getElementById('body').style.backgroundColor = '#fff';
    document.getElementById('login-container').style.backgroundColor = '#fff';
  }
}
