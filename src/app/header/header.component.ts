import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent{
  title = 'App Angular ';
  curso = 'Curso Spring 5 con ANGULAR';
  autor = 'El Gera';
}
