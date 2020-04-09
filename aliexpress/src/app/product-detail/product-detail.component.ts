import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Review} from '../review';
import {ReviewService} from '../review.service';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product;
  ratingsOverview;
  quantity = 1;
  newReview = new Review();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getRatingsOverview();
  }

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(product => this.product = product);
  }

  getRatingsOverview() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductRatingOverview(id).subscribe(ratings => this.ratingsOverview = ratings);
  }


  statsReviews(total, value) {
    if (total) {
      return Math.ceil((value * 5) / total);
    }
    return 0;
  }

  range(n) {
    return Array(Math.max(0, Math.min(5, n)));
  }

  addReview() {
    this.newReview.product = this.product.id;
    this.reviewService.addReview(this.newReview)
      .subscribe(review =>
        this.newReview = new Review()
      );
  }

  addLike(event) {
    const id = this.product.id;
    this.reviewService.addLike(id)
      .subscribe(response => {
          const btn = event.target || event.currentTarget;
          btn.style.background = '#2073d4';
          btn.style.color = '#ffffff';
        }
      );
  }

  addProductToCard() {
    if (this.authService.loggedIn()) {
      const body = {
        product: this.product.id,
        quantity: this.quantity
      };
      console.log(body);
      this.orderService.addProductToCart(body)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    } else {
      alert('Вам нужно войти');
    }
  }
}
