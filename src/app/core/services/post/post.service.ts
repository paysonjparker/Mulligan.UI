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

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.mulliganApiUrl + "/Posts");
  };

  public getPostsByUserId(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.mulliganApiUrl + "/Posts/" + id);
  };

  public deletePost(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Posts/" + id);
  }

  public addPost(post: AddPost, callback: () => void): void {
    this.http.post<Post>(this.mulliganApiUrl + "/Posts", post).
      subscribe((data) => {
        callback();
      });
  }
}
