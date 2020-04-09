import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {
  topProducts;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getTopProducts();
  }

  getTopProducts() {
    this.productService.getTopProducts().subscribe(topProducts => this.topProducts = topProducts.slice(0, 8));
  }

}
