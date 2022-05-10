import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import {map} from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostsListComponent } from './posts-list/posts-list.component';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http
      .get(`https://angular-ngrx-3f5b7-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        'https://angular-ngrx-3f5b7-default-rtdb.firebaseio.com/posts.json',
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }
}
