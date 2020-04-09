import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems;
  user;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getUser();
  }

  getCartItems() {
    this.orderService.getCartItems().subscribe(response => this.cartItems = response);
  }

  calculateTotal() {
    let total = 0;
    for (const item of this.cartItems.items) {
      total += (item.product.has_discount) ? (item.product.price_with_discount * item.quantity) : (item.product.price * item.quantity);
    }
    return total;
  }

  getUser() {
    this.authService.getUserData().subscribe(user => this.user = user);
  }

  addOrder() {
    const body = {
      delivery_address: this.user.profile.address
    };
    this.orderService.createOrder(body)
      .subscribe(
        response => {
          this.router.navigate(['/profile']);
        },
        error => console.log(error)
      );
  }

}
