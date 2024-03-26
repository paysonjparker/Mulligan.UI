import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/core/models/post/post.model';
import { CardModule } from 'primeng/card';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input()
  post!: Post;

  @Input()
  isUserPage: boolean = false;

  author!: User;

  subscriptions!: Subscription;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.subscriptions = this.userService.getUserById(this.post.userId).subscribe({
      next: (data) => {
        this.author = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
