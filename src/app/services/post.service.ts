import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
     return this.http.get(this.url).pipe(retry(3),catchError(this.handleError));
  }

  createPost(post: any) {
    return this.http.post(this.url, JSON.stringify(post));
  }
  
  updatePost(post: any) {
    return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }
  
  deletePost(post: any) {
    return this.http.delete(this.url +'a' + '/'+post.id).pipe(retry(3),catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) 
  {
    if (error.error instanceof ErrorEvent) {
      console.error('Client Error:', error.error.message);
    }

    else {
      console.log(`backend error: status code: ${error.status}' error: ${error.error} `)
    }

    return throwError('Bilinmeyen Bir Hata Oluştu');
    
  }
}