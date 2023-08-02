import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  employees!: any[];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    http.get<any[]>('https://localhost:7139/api/Products').subscribe((result) => {
      this.employees = result;
    });
  }

  // Function to convert hexadecimal thumbnail data to a Base64-encoded image URL
  getThumbnailImageURL(thumbNailPhoto: string): SafeUrl {
    const base64Image = 'data:image/jpeg;base64,' + thumbNailPhoto;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

}

