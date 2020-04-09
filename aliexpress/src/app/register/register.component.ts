import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    const registerUserData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    };
    this.authService.registerUser(registerUserData)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

}
