import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../feature/service/cart.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { SrvproductService } from '../service/srvproduct.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  paymentHandler: any = null;
  items = this.cartService.getItems();

  private headerOptionsSubscription: Subscription;
  private headerOptions?: HttpHeaders;

  cus: OldCustomer = {
    customerId: 0,
    NameStyle: false,
    FirstName: '',
    LastName: '',
    PasswordHash: '',
    PasswordSalt: ''
  }
  orderH: OrderHeader = {
    salesOrderId: 0
  }
  //headerOptions = new HttpHeaders().set('Content-Type', 'application/json')
 

  ngOnInit() {
    this.invokeStripe();
  }

  constructor(private cartService: CartService, private sanitizer: DomSanitizer, private http: HttpClient, private srv: SrvproductService,private router: Router) {
    //Aggiunge i valori ad headerOptionsSubscription
    this.headerOptionsSubscription = this.srv.headerOptions$.subscribe(
      (headerOptions) => {
        this.headerOptions = headerOptions;
      }
    );
  }

  //Cancella i vecchi valori
  ngOnDestroy(): void {
    this.headerOptionsSubscription.unsubscribe();
  }

  getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
    const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

// cart.component.ts
removeItem(index: number) {
  this.cartService.removeFromCart(index);
}

// cart.component.ts
changeQuantity(index: number, newQuantity: number) {
  this.cartService.updateQuantity(index, newQuantity);
}

updateQuantity(event: any, idx: number) {
  const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
  this.changeQuantity(idx, newQuantity);
}



// metodi per il pagamento

makePayment(amount: any) {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51NhTQyKf3wXGs8nVSMbhGY3nGRvtZuexqeSRxxlYbZXaFhq8mtQsLDKPPf2tQVJ4MFQd09AcUFRYAnvGoF1BqO4i00nrDxBTji',
    locale: 'auto',
    token: (stripeToken: any) => {
      console.log(stripeToken);

      const email: string = stripeToken.email;

      this.http.get<OldCustomer>(`https://localhost:7139/api/Customers/GetCustomerByEmail/${email}`)
      .subscribe(
        (resp) => {

          this.cus = resp;
        },
        (error) => {
          // Gestisci gli errori della richiesta HTTP qui.
          console.error('Errore nella richiesta HTTP:', error);
        }
      );

      this.postOrderHistory();

      this.cartService.clearCart();
      this.router.navigate(['/']); // Reindirizza l'utente alla pagina "home"

    },
  });



  paymentHandler.open({
    name: 'Positronx',
    description: '3 widgets',
    amount: amount * 100,
  });

 
}

invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Payment has been successfull!');
        },
      });
    };
    window.document.body.appendChild(script);
  }
}

getSubtotal(): number {
  let total: number = 0;


for (let i = 0; i < this.items.length; i++) {

    if (this.items[i].quantity > 1) {
      total +=
      this.items[i].product.listPrice * this.items[i].quantity;
    }
    else {
      total +=
     this.items[i].product.listPrice;
    }
  }

  return total;
  }

  postOrderHistory(){

    //prendere l'id del customer

    const body = { salesOrderId: 0, orderDate: new Date(), customerId: this.cus?.customerId, subTotal: this.getSubtotal(),
    revisionNumber: 0, dueDate: new Date(), status: 5, onlineOrderFlag: false, salesOrderNumber: "SO71774",  shipMethod: "bartolini",
    taxAmt: 0, freight: 22.0087, totalDue: 0,rowguid: crypto.randomUUID(),   modifiedDate: new Date(),  billToAddress: null,
    salesOrderDetails: [],  shipToAddress: null};


    //Post order header

    this.http.post<OrderHeader>('https://localhost:7139/api/SalesOrderHeaders', body, {
      headers: this.headerOptions,
    })
    .subscribe(
      (resp) => {

        this.orderH = resp as OrderHeader;
        this.postOrderDetails(this.orderH);
      },
      (error) => {
        // Gestisci gli errori della richiesta HTTP qui.
        console.error('Errore nella richiesta HTTP:', error);
      }
    );


    

  }

  postOrderDetails(orderHead: OrderHeader){


    for(let i = 0; i < this.items.length; i++){

      const body2 = { salesOrderId: orderHead.salesOrderId as number, salesOrderDetailId: 0, orderQty: this.items[i].quantity,
        productId: this.items[i].product.productId, unitPrice: this.items[i].product.listPrice,  unitPriceDiscount: 0.0000,
        lineTotal: this.items[i].product.listPrice * this.items[i].quantity, rowguid: crypto.randomUUID(),
        modifiedDate: new Date()}


      //post order detail
      this.http.post('https://localhost:7139/api/SalesOrderDetails', body2, {
      headers: this.headerOptions,
      observe: 'response' // To get the full HTTP response, including the status code.
    })
    .subscribe(
      (resp) => {
        if (resp.status === 201) {
          // Registration was successful, you can navigate to a success page.
          console.log('Order sent');
        } else if (resp.status === 400) {
          alert('Something went wrong with the order registration !!!');
        } else {
          alert("Invalid Order");
        }
      },
      (error) => {
        // Handle HTTP request errors here.
        console.error('HTTP request error:', error);
      }
    );



    }
  }

}

export interface CustomerData{
  CustomerId: number;
  Email: string;
  Pwd: string;
}

export interface OldCustomer{
  customerId: number;
  NameStyle: boolean;
  FirstName: string;
  LastName: string;
  PasswordHash: string;
  PasswordSalt: string;
}

export interface OrderHeader{
  salesOrderId: number;
}












