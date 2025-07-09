import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post []> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }
}
