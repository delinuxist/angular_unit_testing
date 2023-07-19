import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import * as PostActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PostsEffect {
  constructor(private actions$: Actions, private postsService: PostsService) {}
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => PostActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
