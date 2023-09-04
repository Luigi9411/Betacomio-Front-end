import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../feature/service/product.service';
import { Router } from '@angular/router';
import { SrvproductService } from 'src/app/feature/service/srvproduct.service';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-section-top',
  templateUrl: './section-top.component.html',
  styleUrls: ['./section-top.component.css']
})
export class SectionTopComponent implements OnInit  {
  products$!: Observable<Products[]>;
  products!: Products[];
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient, private productService: ProductService,private router: Router, private srv: SrvproductService ) {}

  goToProducts(searchTerm: string) {
    this.productService.setSearchTerm(searchTerm);
    this.router.navigate(['/products']);
    this.products$ = this.searchProducts(searchTerm);

  // Scroll to the top of the page
  window.scrollTo(0, 0);
  }

  searchProducts(term: string): Observable<Products[]> {
    if (!term.trim()) {
      // Se il termine di ricerca Ã¨ vuoto, restituisci un array vuoto.
      return of([]);
    }
    // Aggiungi la tua logica per effettuare la ricerca dei prodotti qui.
    // Ad esempio, puoi utilizzare HttpClient per effettuare una richiesta HTTP al tuo server API.
    return this.http.get<Products[]>(`https://localhost:7139/api/VProductDescriptionPrices/GetProductsByCategoryAndName/${term}`);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
       debounceTime(10),
       distinctUntilChanged(),
      switchMap((term: string) => this.searchProducts(term)),
    );
  }

}

export interface Products {
  productId: number;
  name: string;
  color: string;
  listPrice: number;
  thumbNailPhoto: string;
  ThumbNailPhotoFileName: string;
  culture: string;
  description: string;
  categoryName: string;
}