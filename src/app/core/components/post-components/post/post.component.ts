import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/core/models/post/post.model';
import { CardModule } from 'primeng/card';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user/user.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostService } from 'src/app/core/services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PostComponent implements OnInit, OnDestroy {

  @Input()
  post!: Post;

  @Input()
  isUserPage: boolean = false;

  author!: User;

  subscriptions!: Subscription;

  constructor(private userService: UserService,
    private confirmationService: ConfirmationService,
    private postService: PostService,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone,
  ) {

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

  onEditClick(postId: string) {
    this.router.navigate(['posts/edit/', postId]);
  }

  onDeleteClick(postId: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this post?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePost(postId);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: `Post was deleted successfully.` });
      },
      reject: () => {

      }
    });
  }

  deletePost(postId: string) {
    this.ngZone.run(() => {
      this.subscriptions = this.postService.deletePost(postId).subscribe({
        next: () => {
          console.info("Deleted post ID: ", postId);
          location.reload();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

}
