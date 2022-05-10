import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, mergeMap, tap } from 'rxjs/operators';
import { PostService } from './post.service';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  // constructor(private postService: PostService) {}
  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | Observable<boolean> | Promise<boolean> {
  //   return this.postService.loaded$.pipe(
  //     mergeMap((loaded: any) => {
  //       if (loaded) {
  //       }
  //       return this.postService.getAll().pipe(
  //         map((posts) => {
  //           return !!posts;
  //         })
  //       );
  //     })
  //   );
  // }

  constructor(private PostService: PostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.PostService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.PostService.getAll();
        }
      }),
      first()
    );
  }
}
