import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.loginUser(user)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          console.log(response);
        },
        error => console.log(error)
      );
  }

}
