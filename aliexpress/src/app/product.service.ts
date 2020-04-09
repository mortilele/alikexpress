import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient ) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/' + id + '/', this.httpOptions);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/', this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getNewProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/', {params: {is_new: 'true'}, headers: this.httpHeaders});
  }

  getTopProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/', {params: {in_top: 'true'}, headers: this.httpHeaders});
  }

  getProductsByCategoryId(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/', {params: {category: id}, headers: this.httpHeaders});
  }

  getProductsByFabricator(id, categoryId): Observable<any> {
    const params = {
      fabricator: id,
      category: (categoryId) ? categoryId : ''
    };
    return this.http.get(this.baseUrl + '/api/products/', {params, headers: this.httpHeaders});
  }

  getProductRatingOverview(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/reviews/total_ratings/', {params: {product: id}, headers: this.httpHeaders});
  }

  getOrderedProducts(ordering): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/', {params: {ordering}, headers: this.httpHeaders});
  }

  private handleError(operation = 'operation', result?) {
    return (error: any): Observable<any> => {
      console.log('Handle error');
      console.error(error); // log to console instead
      return of(result);
    };
  }
}
