import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 }
  ];

  qrImage: string | null = null;

  constructor(private http: HttpClient) {}

  generateQr(): void {
    this.http
      .get<{ statusCode: number; body: { id: string; qr: string } }>(
        'https://zplloylaoh.execute-api.us-east-1.amazonaws.com/prod/generate-qr'
      )
      .subscribe((response) => {
        this.qrImage = response.body.qr;
      });
  }
}
