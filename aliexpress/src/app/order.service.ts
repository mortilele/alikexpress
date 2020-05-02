import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemUrl = 'https://api.alikexpress.solf.io/api/cart-items/';
  private userCartUrl = 'https://api.alikexpress.solf.io/api/carts/';
  private orderUrl = 'https://api.alikexpress.solf.io/api/orders/';
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
