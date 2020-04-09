import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient ) { }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/categories/', this.httpOptions);
  }

  getFabricators(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/fabricators/', this.httpOptions);
  }

  getFabricatorsByCategory(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/fabricators/', {params: {products__category: id}, headers: this.httpHeaders});
  }
}
