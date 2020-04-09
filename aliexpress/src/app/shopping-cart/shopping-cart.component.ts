import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products;
  user;
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUser();
    console.log(this.user.id);
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getUser() {
    this.authService.getUserData().subscribe(user => this.user = user);
  }

}
