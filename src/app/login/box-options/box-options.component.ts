import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-box-options',
  templateUrl: './box-options.component.html',
})
export class BoxOptionsComponent {
  isLogged: Boolean = false;
  optSelected: Boolean = false;
  emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$.!%?&]){8,}$/;

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern),
    ]),
  });
  @Output() evento = new EventEmitter<Boolean>();

  constructor() {}

  login() {
    this.isLogged = true;
    document.getElementById('body').style.backgroundColor = '#fff';
    document.getElementById('login-container').style.backgroundColor = '#fff';
  }

  opt() {
    this.optSelected = !this.optSelected;
    this.evento.emit(this.optSelected);
  }

  get email () {
    return this.formLogin.get('email');
  }
  
  get password () {
    return this.formLogin.get('password');
  }
}
