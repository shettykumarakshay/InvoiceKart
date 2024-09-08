import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { API_ENDPOINTS } from '../../configs/app.contants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(API_ENDPOINTS.customers);
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.httpClient.get(API_ENDPOINTS.customers + "/Id?categoryId=" + categoryId);
  }

  addCategory(category: Category) {
    return this.httpClient.post(API_ENDPOINTS.customers, category);
  }

  updateCategory(updatedCategory: Category) {
    return this.httpClient.put(API_ENDPOINTS.customers, updatedCategory);
  }

  deleteCategory(categoryId: number) {
    return this.httpClient.delete(API_ENDPOINTS.category + "?categoryId=" + categoryId);
  }
}
