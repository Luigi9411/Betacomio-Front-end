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
  product: Product = {
  productId: 0,
  name: '',
  color: '',
  listPrice: 0,
  thumbNailPhoto: '',
  ThumbNailPhotoFileName: '',
  culture: '',
  description: '',
  categoryName: ''
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.productService.getSelectedProductId()?.toString();
    this.http.get<Product>(`https://localhost:7139/api/VProductDescriptionPrices/${productId}`)
    .subscribe(data => {
      console.log(data)
      this.product = data;
    });
  }


  // Function to convert hexadecimal thumbnail data to a Base64-encoded image URL
  getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
    const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

}

export interface Product {
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
