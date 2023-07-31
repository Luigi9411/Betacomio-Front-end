import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
   employees!: any[];

   constructor(http: HttpClient) {
       http
       .get<any[]>('https://localhost:7139/api/NewCustomers')
       .subscribe((result) => {this.employees = result});
   }
}
