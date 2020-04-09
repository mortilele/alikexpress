import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  user;
  orders;
  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getOrders();
  }

  getUser() {
    this.authService.getUserData().subscribe(user => this.user = user);
  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe(
        orders => this.orders = orders,
        error => console.log(error)
      );
  }

  changeUserData() {
    // const data = {
    //   email: this.user.email,
    //   profile: {
    //     phone_number: this.user.profile.phone_number,
    //     address: this.user.profile.address
    //   }
    // };
    this.authService.changeUserData(this.user)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

}
