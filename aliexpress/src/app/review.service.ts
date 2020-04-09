import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Review} from './review';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient ) { }

  addReview(review: Review): Observable<any> {
    return this.http.post(this.baseUrl + '/api/reviews/', review, this.httpOptions)
      .pipe(tap((newComment: Comment) => console.log('added comment')),
          catchError(this.handleError<any>('add comment'))
    );
  }

  addLike(product) {
    return this.http.post(this.baseUrl + '/api/reviews/like/', {product}, this.httpOptions)
      .pipe(tap((newComment: Comment) => console.log('posted like')),
        catchError(this.handleError<any>('add like'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      return of(result as T);
    };
  }
}
