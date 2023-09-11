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


// SELECT TOP (1000) SalesOrderHeader_1.SalesOrderID, SalesLT.SalesOrderDetail.OrderQty, SalesLT.SalesOrderDetail.ProductID, SalesOrderHeader_1.CustomerID, SalesOrderHeader_1.SubTotal, SalesOrderHeader_1.OrderDate,
//                   SalesLT.SalesOrderDetail.UnitPrice
// FROM     (SELECT DISTINCT SalesOrderID
//                   FROM      SalesLT.SalesOrderHeader) AS UniqueOrderIDs INNER JOIN
//                   SalesLT.SalesOrderHeader AS SalesOrderHeader_1 ON UniqueOrderIDs.SalesOrderID = SalesOrderHeader_1.SalesOrderID INNER JOIN
//                   SalesLT.SalesOrderDetail ON SalesOrderHeader_1.SalesOrderID = SalesLT.SalesOrderDetail.SalesOrderID
// ORDER BY SalesOrderHeader_1.OrderDate DESC
