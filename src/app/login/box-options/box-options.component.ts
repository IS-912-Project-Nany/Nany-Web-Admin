import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-box-options',
  templateUrl: './box-options.component.html',
})
export class BoxOptionsComponent {
  isLogged: Boolean = false;
  optSelected:Boolean =false;
  @Output () evento = new EventEmitter<Boolean>();
  
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
}
