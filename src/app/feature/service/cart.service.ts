import { Products } from '../products/products.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: { product: Products, quantity: number }[] = [];

  constructor() { }

 // cart.service.ts
addToCart(product: Products, quantity: number = 1) {
  const existingItem = this.items.find(item => item.product === product);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ product, quantity });
  }
}


  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  // cart.service.ts
removeFromCart(index: number) {
  this.items.splice(index, 1);
}

// cart.service.ts
updateQuantity(index: number, newQuantity: number) {
  this.items[index].quantity = newQuantity;
}


}
