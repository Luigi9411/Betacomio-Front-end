import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  products!: Products[];
  filteredEmployees: Products[] = []; // Lista filtrata degli impiegati
  filters: { id: string, label: string, selected: boolean }[] = [
    { id: '1', label: 'Mountain Bikes', selected: false },
    { id: '2', label: 'Road Bikes', selected: false },
    { id: '3', label: 'Touring Bikes', selected: false },
    { id: '4', label: 'Jerseys', selected: false },
    { id: '5', label: 'Mountain Frames', selected: false },
    { id: '6', label: 'Forks', selected: false },
    { id: '7', label: 'Handlebars', selected: false },
    { id: '8', label: 'Wheels', selected: false },
    { id: '9', label: 'Shorts', selected: false },
    { id: '10', label: 'Locks', selected: false },
    { id: '11', label: 'Pumps', selected: false },
    { id: '12', label: 'Lights', selected: false },
    { id: '13', label: 'Bottles and Cages', selected: false },
    { id: '14', label: 'Tires and Tubes', selected: false },
    { id: '15', label: 'Touring Frames', selected: false },
    { id: '16', label: 'Derailleurs', selected: false },
    { id: '17', label: 'Saddles', selected: false },
    { id: '18', label: 'Pedals', selected: false },
    { id: '19', label: 'Chains', selected: false },
  ];

  showAlert = false;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private productService: ProductService,
    private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7139/api/VProductDescriptionPrices')
      .subscribe(data => {
        this.products = data;
        this.applySearchFilter(this.productService.getSearchTerm());
      });

    this.productService.searchTerm$.subscribe((searchTerm) => {
      // Filtra i prodotti in base al termine di ricerca e aggiorna le card
      this.applySearchFilter(searchTerm);
      // Elimina eventuali filtri prima di fare la ricerca con il Search
      this.filters.forEach(filter => filter.selected = false);
    });
  }

  addToCart(product: Products) {
    this.cartService.addToCart(product);
    this.showAlertMessage();
  }

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 1500);
  }


  //metodo che permette la ricerca con search anche da navbar in pagina
  applySearchFilter(searchTerm: string): void {
    this.filteredEmployees = this.products.filter(p => p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) || p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  applyFilters(): void {
    this.filteredEmployees = this.products.filter(p => {
      return this.filters.some(filter => filter.selected && p.categoryName === filter.label);
    });
  }
  toggleFilter(filter: any): void {
    filter.selected = !filter.selected;
    this.applyFilters();
  }

  // Function to convert hexadecimal thumbnail data to a Base64-encoded image URL
  getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
    const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

  //collegamento alla pagina dei dettagli prodotto e id prodotto
  GetDetail(productId: number): void {
    this.productService.setSelectedProductId(productId);
    this.router.navigate(['/product-details', productId]);
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














