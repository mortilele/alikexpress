import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://127.0.0.1:8000/api/users/';
  private loginUrl = 'http://127.0.0.1:8000/authenticate/';
  private userUrl = 'http://127.0.0.1:8000/api/users/';
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
