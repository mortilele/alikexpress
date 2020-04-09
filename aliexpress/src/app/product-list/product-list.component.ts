import {Component, Input, OnInit} from '@angular/core';

import { ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  categories: any;
  fabricators: any;
  currentCategory;
  ordering = 'name';
  priceRange;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.getProducts();
    } else {
      this.currentCategory = id;
      this.getProductsByCategory(this.currentCategory);
    }
    this.getCategories();
    this.getFabricators();
  }

  getProductsByCategory(categoryId) {
    this.currentCategory = categoryId;
    this.productService.getProductsByCategoryId(categoryId).subscribe(products => this.products = products);
    this.getFabricatorsByCategory(categoryId);
  }

  getProducts() {
    this.currentCategory = null;
    this.productService.getProducts().subscribe(products => this.products = products);
    this.getFabricators();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getFabricators() {
    this.categoryService.getFabricators().subscribe(fabricators => this.fabricators = fabricators);
  }

  getFabricatorsByCategory(id) {
    this.categoryService.getFabricatorsByCategory(id).subscribe(fabricators => this.fabricators = fabricators);
  }

  getProductsByFabricator(id) {
    this.productService.getProductsByFabricator(id, this.currentCategory).subscribe(products => this.products = products);
  }

  getOrderedProducts() {
    this.productService.getOrderedProducts(this.ordering).subscribe(products => this.products = products);
  }
}
