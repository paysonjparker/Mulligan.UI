import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ennvironments } from '../../environments/environments';
import { AddPost } from '../../models/post/add-post.request';
import { Post } from '../../models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly mulliganApiUrl = ennvironments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllPosts(callback: (posts: Post[]) => void): void {
    this.http.get<Post[]>(this.mulliganApiUrl + "/Posts").
      subscribe((posts: Post[]) => {
        callback(posts);
      });
  }

  public getPostsByUserId(id : string, callback: (posts: Post[]) => void): void {
    this.http.get<Post[]>(this.mulliganApiUrl + "/Posts/" + id).
      subscribe((posts: Post[]) => {
        callback(posts);
      });
  }

  public deletePost(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Posts/" + id);
  }

  public addPost(post: AddPost, callback:() => void): void {
    this.http.post<Post>(this.mulliganApiUrl + "/Posts", post).
      subscribe((data) => {
        callback();
      });
  }
}
