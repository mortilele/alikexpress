import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemUrl = 'http://localhost:8000/api/cart-items/';
  private userCartUrl = 'http://localhost:8000/api/carts/';
  private orderUrl = 'http://localhost:8000/api/orders/';
  constructor(private http: HttpClient) { }

  addProductToCart(body) {
    return this.http.post(this.cartItemUrl, body);
  }

  getCartItems() {
    return this.http.get(this.userCartUrl);
  }

  createOrder(body) {
    return this.http.post(this.orderUrl, body);
  }

  getOrders() {
    return this.http.get(this.orderUrl);
  }
}
