import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../configs/app.contants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly httpClient: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.httpClient.get(API_ENDPOINTS.customers);
  }

  getCustomerById(customerId: number): Observable<any> {
    return this.httpClient.get(API_ENDPOINTS.customers + "/Id?customerId=" + customerId);
  }

  addCustomer(customer: Customer) {
    return this.httpClient.post(API_ENDPOINTS.customers, customer);
  }

  updateCustomer(updatedCustomer: Customer) {
    return this.httpClient.put(API_ENDPOINTS.customers, updatedCustomer);
  }

  deleteCustomer(customerId: number) {
    return this.httpClient.delete(API_ENDPOINTS.customers + "?customerId=" + customerId);
  }
}
