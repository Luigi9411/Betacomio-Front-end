import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../products/products.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})

export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Puoi inserire eventuali inizializzazioni qui, se necessario
  }

  addToCart(product: Products) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}


