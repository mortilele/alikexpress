import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'https://api.alikexpress.solf.io/api/users/';
  private loginUrl = 'https://api.alikexpress.solf.io/authenticate/';
  private userUrl = 'https://api.alikexpress.solf.io/api/users/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(user): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  getUserData() {
    const id = this.getUserId();
    return this.http.get(this.userUrl + id + '/');
  }

  changeUserData(user) {
    const id = this.getUserId();
    return this.http.put(this.userUrl + id + '/', user);
  }
}
