import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemUrl = 'http://api.ocenika.com/api/cart-items/';
  private userCartUrl = 'http://api.ocenika.com/api/carts/';
  private orderUrl = 'http://api.ocenika.com/api/orders/';
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
