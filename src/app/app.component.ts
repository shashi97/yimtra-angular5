import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<angular-loader></angular-loader><router-outlet></router-outlet><app-error></app-error>',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
}
