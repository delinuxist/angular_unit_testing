import { Component, OnInit, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PostActions from '../../store/actions';
import { Observable } from 'rxjs';
import { isLoadingSelector, postsSelector } from '../../store/selectors';
import { AppStateInterface } from '../../../types/types';
import { PostInterface } from '../../types/type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  posts$: Observable<PostInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.posts$ = this.store.pipe(select(postsSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.getPosts());
  }
}
