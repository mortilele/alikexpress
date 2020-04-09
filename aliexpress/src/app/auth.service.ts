import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://127.0.0.1:8000/api/users/';
  private loginUrl = 'http://127.0.0.1:8000/api-token-auth/';
  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }


}
