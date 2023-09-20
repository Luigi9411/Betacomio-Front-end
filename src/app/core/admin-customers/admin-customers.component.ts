import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SrvproductService } from '../../feature/service/srvproduct.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit, OnDestroy {

  customer!: Customers[];
  private headerOptionsSubscription: Subscription;
  private headerOptions?: HttpHeaders;

  constructor(  private http: HttpClient, private srv: SrvproductService) {
    //Aggiunge i valori ad headerOptionsSubscription
    this.headerOptionsSubscription = this.srv.headerOptions$.subscribe(
      (headerOptions) => {
        this.headerOptions = headerOptions;
      }
    );
  }


  ngOnInit(): void {
    this.http.get<Customers[]>('https://localhost:7139/api/Customers/GetCustomers', {
      headers: this.headerOptions,
    })
    .subscribe(
      (resp) => {
        this.customer = resp;
      },
      (error) => {
        // Gestisci gli errori della richiesta HTTP qui.
        console.error('Errore nella richiesta HTTP:', error);
      }
    );
  }

  deleteCustomer(customerId: number): void {
    const url = `https://localhost:7139/api/Customers/${customerId}`;

    this.http.delete<Customers[]>(url, {
      headers: this.headerOptions,
    })
    .subscribe(
      (resp) => {
        this.customer = resp;
      },
      (error) => {
        // Gestisci gli errori della richiesta HTTP qui.
        console.error('Errore nella richiesta HTTP:', error);
      }
    );
  }



  ngOnDestroy(): void {
    this.headerOptionsSubscription.unsubscribe();
  }
}


export interface Customers {
  customerId: number;
  firstName : string;
  lastName: string;
  emailAddress: number;
  phone: number;
  modifiedDate: Date;
}






