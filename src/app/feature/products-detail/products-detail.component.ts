import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Products[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.productService.getSelectedProductId()?.toString();
    this.http.get<Products[]>('https://localhost:7139/api/VProductDescriptionPrices/${productId}')
    .subscribe(data => {
      console.log(data)
      this.products = data;
    });
  }


  // Function to convert hexadecimal thumbnail data to a Base64-encoded image URL
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
