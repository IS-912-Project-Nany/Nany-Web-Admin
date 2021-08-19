import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  
  formLogin = new FormGroup({
    correo: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  responseLoggin: any = '';

  constructor(
    private authService: AuthService,
    private cookiesService: CookieService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    document.getElementById('body').style.backgroundColor = '#FFE9C7';
  }

  login() {
    console.log('El usuario a autenticar:', this.formLogin);
    this.authService.login(this.formLogin.value).subscribe(
      (result) => {
        if (result.code == 1) {
          if (result.usuario.tipoUsuario.idUsuario == 3) {  
            const dateNow = new Date();
            dateNow.setMinutes(dateNow.getMinutes() + 60);
            this.cookiesService.set('nanyAdminId', result.usuario._id, dateNow);
            this.cookiesService.set(
              'nanyAdminNombre',
              result.usuario.nombre,
              dateNow
            );
            this.cookiesService.set(
              'nanyAdminApellido',
              result.usuario.apellido,
              dateNow
            );
            console.log('Logeado con exito');
            this._route.navigate(['/Categorias']);
          } else {
            this.password.setValue('');
            this.correo.setValue('');
          }
        } else if (result.code == 2) {
          // Contrasenia Incorrecta
          this.responseLoggin = result;
          this.password.setValue('');
        } else {
          // Correo Incorrecto
          this.responseLoggin = result;
          this.correo.setValue('');
        }
        console.log(result.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get correo() {
    return this.formLogin.get('correo');
  }

  get password() {
    return this.formLogin.get('password');
  }
}
