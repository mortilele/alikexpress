import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
          localStorage.setItem('id', response.id);
          this.router.navigate(['/profile']);
          console.log(response);
        },
        error => console.log(error)
      );
  }

}
