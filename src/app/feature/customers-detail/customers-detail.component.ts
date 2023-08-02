import { Component } from '@angular/core';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css']
})
export class CustomersDetailComponent {
  public hexCode!: string;

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String: string | ArrayBuffer | null = reader.result;
      if (base64String && typeof base64String === 'string') {
        this.convertToHex(base64String);
      } else {
        console.error('Unexpected FileReader result type.');
      }
    };
    reader.onerror = (error) => {
      console.error('Error while reading the file:', error);
    };
    reader.readAsDataURL(file);
  }

  convertToHex(base64String: string): void {
    const image = new Image();
    image.src = base64String;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, image.width, image.height).data;
        let hexCode = '';
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i].toString(16).padStart(2, '0');
          const g = imageData[i + 1].toString(16).padStart(2, '0');
          const b = imageData[i + 2].toString(16).padStart(2, '0');
          hexCode += `#${r}${g}${b}\n`;
        }

        this.hexCode = hexCode;
      } else {
        console.error('Could not get 2D context from canvas element.');
      }
    };
    image.onerror = (error) => {
      console.error('Error while loading the image:', error);
    };
  }

  resetHexCode(): void {
    this.hexCode = '';
  }
}

