import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  firstname = '';
  lastname = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  registerUser() {
    const registerUserData = {
      username: this.username,
      email: this.email,
      password: this.password,
      first_name: this.firstname,
      last_name: this.lastname
    };
    this.authService.registerUser(registerUserData)
      .subscribe(
        response => {
          this.router.navigate(['/login']);
          console.log(response);
        },
        error => console.log(error)
      );
  }

}
