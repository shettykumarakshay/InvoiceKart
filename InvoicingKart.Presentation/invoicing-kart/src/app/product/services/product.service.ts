import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../configs/app.contants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(API_ENDPOINTS.products);
  }

  getProductById(productId: number): Observable<any> {
    return this.httpClient.get( API_ENDPOINTS.products + "/Id?productId=" + productId);
  }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(API_ENDPOINTS.products, product);
  }

  updateProduct(updatedProduct: Product): Observable<any> {
    return this.httpClient.put(API_ENDPOINTS.products , updatedProduct);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.httpClient.delete(API_ENDPOINTS.products + "?productId=" + productId);
  }
}
