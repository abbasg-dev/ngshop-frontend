import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Order, Product } from '../models/order';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders';
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post(this.apiURLOrders, order)
  }

  updateOrderStatus(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}/status`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/total-sales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }
}
