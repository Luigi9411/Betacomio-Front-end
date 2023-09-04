import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../../feature/service/product.service';
import { Router } from '@angular/router';
import { SrvproductService } from 'src/app/feature/service/srvproduct.service';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-section-five',
  templateUrl: './section-five.component.html',
  styleUrls: ['./section-five.component.css']
})
export class SectionFiveComponent implements OnInit  {
  products!: Products[];
  filteredProducts: Products[] = [];
  products$!: Observable<Products[]>;
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient,  private sanitizer: DomSanitizer, private productService: ProductService,private router: Router, private srv: SrvproductService) {}

  ngOnInit(): void {
    this.http.get<Products[]>('https://localhost:7139/api/VProductDescriptionPrices')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = this.products.filter(product => {
          return ['Shorts', 'Locks', 'Lights', 'Chains'].includes(product.categoryName);
        });
      });

      this.products$ = this.searchTerms.pipe(
        debounceTime(10),
        distinctUntilChanged(),
       switchMap((term: string) => this.searchProducts(term)),
     );
  }

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

  getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
    const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
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