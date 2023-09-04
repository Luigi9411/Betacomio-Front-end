import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();
  selectedProductId: number | null = null;

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  //metodo che permette la ricerca con search anche da navbar in pagina
  getSearchTerm(): string {
    return this.searchTermSource.getValue();
  }

  //metodi che permette la cattura del dato productId per la richiesta get nel product-detail
  setSelectedProductId(productId: number): void {
    this.selectedProductId = productId;
  }

  getSelectedProductId(): number | null {
    return this.selectedProductId;
  }


}





