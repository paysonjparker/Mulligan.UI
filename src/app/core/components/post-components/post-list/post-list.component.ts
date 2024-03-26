import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/models/post/post.model';
import { Subscription } from 'rxjs';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input()
  displayAllPosts: boolean = true;

  @Input()
  userId!: string;

  posts: Post[] = [];

  subscriptions!: Subscription;

  constructor(private postService: PostService

  ) { }

  ngOnInit() {
    if (this.displayAllPosts) {
      this.getAllPosts();
    } else {
      this.getPostsByUserId();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAllPosts() {
    this.subscriptions = this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getPostsByUserId() {
    this.subscriptions = this.postService.getPostsByUserId(this.userId).subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
