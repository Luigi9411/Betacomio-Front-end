import { Component } from '@angular/core';
import { CartService } from '../../feature/service/cart.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  paymentHandler: any = null;
  items = this.cartService.getItems();

  ngOnInit() {
    this.invokeStripe();
  }

  constructor(
    private cartService: CartService, private sanitizer: DomSanitizer
  ) { }

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
    token: function (stripeToken: any) {
      console.log(stripeToken);
      alert('Stripe token generated!');
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
}








