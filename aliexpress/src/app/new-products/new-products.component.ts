import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {
  newProducts;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getNewProducts();
  }

  getNewProducts() {
    this.productService.getNewProducts().subscribe(newProducts => this.newProducts = newProducts.slice(0, 5));
  }

}
