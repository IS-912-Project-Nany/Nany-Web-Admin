import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById('body').style.backgroundColor = '#FFF';
  }

}
