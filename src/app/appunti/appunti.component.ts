// import { Component } from '@angular/core';
// import { CartService } from '../../feature/service/cart.service';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent {

//   items = this.cartService.getItems();

//   constructor(
//     private cartService: CartService, private sanitizer: DomSanitizer
//   ) { }

//   getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
//     const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
//     return this.sanitizer.bypassSecurityTrustUrl(base64Image);
//   }

// // cart.component.ts
// removeItem(index: number) {
//   this.cartService.removeFromCart(index);
// }

// // cart.component.ts
// changeQuantity(index: number, newQuantity: number) {
//   this.cartService.updateQuantity(index, newQuantity);
// }

// updateQuantity(event: any, idx: number) {
//   const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
//   this.changeQuantity(idx, newQuantity);
// }

// }



// const authBasicValue = sessionStorage.getItem('AuthBasic');
//   if (authBasicValue) {
//     alert(authBasicValue)
//   this.headerOptions = this.headerOptions.set('Authorization', authBasicValue as string);
//   } else {
//   alert('la sessione è scaduta, rieffettua il login')
//   return;
// }