import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-slider></app-slider>
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
   `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Betacomio2';
}
