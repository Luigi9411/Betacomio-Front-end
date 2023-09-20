import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SrvproductService } from '../../feature/service/srvproduct.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy{
  orderHistory!: OrderHistory[];
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
    this.http.get<OrderHistory[]>('https://localhost:7139/api/VOrderHistories', {
      headers: this.headerOptions,
    })
    .subscribe(
      (resp) => {
        this.orderHistory = resp;
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


export interface OrderHistory {
  salesOrderId: number;
  orderQty : number;
  productId: number;
  customerId: number;
  subTotal: number;
  orderDate: Date;
  unitPrice: number;
}



