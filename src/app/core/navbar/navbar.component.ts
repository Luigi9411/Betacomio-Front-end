import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../feature/service/product.service';
import { SrvproductService } from 'src/app/feature/service/srvproduct.service';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  products!: Products[];
  products$!: Observable<Products[]>;
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient, private productService: ProductService,private router: Router, private srv: SrvproductService ) {}

  //ricerca da navbar
  goToProducts(searchTerm: string) {
    this.productService.setSearchTerm(searchTerm);
    this.router.navigate(['/products']);
    this.products$ = this.searchProducts(searchTerm);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }

   //ricerca da navbar
  searchProducts(term: string): Observable<Products[]> {
    if (!term.trim()) {
      // Se il termine di ricerca Ã¨ vuoto, restituisci un array vuoto.
      return of([]);
    }
    // Aggiungi la tua logica per effettuare la ricerca dei prodotti qui.
    // Ad esempio, puoi utilizzare HttpClient per effettuare una richiesta HTTP al tuo server API.
    return this.http.get<Products[]>(`https://localhost:7139/api/VProductDescriptionPrices/GetProductsByCategoryAndName/${term}`);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  isAdmin(): boolean {
    const userRole = sessionStorage.getItem("Role");
    return userRole === "Admin";
  }

  isUser(): boolean {
    const userRole = sessionStorage.getItem("Role");
    return userRole === "User";
  }

  onLogout() {
    this.srv.logout();
    this.router.navigate(['/']);
  }



  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
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














