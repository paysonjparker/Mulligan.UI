import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/core/models/post/post.model';
import { CardModule } from 'primeng/card';

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
export class PostComponent implements OnInit {

  @Input()
  post!: Post;

  ngOnInit() {

  }

}
