import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsResolver } from './posts.resolver';
import { SinglePostComponent } from './single-post/single-post.component';
import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  EntityDefinitionService,
  EntityDataService,
} from '@ngrx/data';
import { PostDataService } from './posts-data.service';
import { Post } from '../models/post.model';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'add',
    component: AddPostComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver },
  },
];

const entityMetadata: EntityMetadataMap = {
  Post: {
    // entityName for custom entity name
    //selectId for primary key setting
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
};

function sortByName(a: Post, b: Post): number {
  let comp = a.title.localeCompare(b.title);

  return comp;
}

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  providers: [PostsResolver, PostDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postDataService: PostDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postDataService);
  }
}
