import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { PostCreationRequest } from '../../models/post/post-creation.request';
import { Post } from '../../models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.mulliganApiUrl + "/posts");
  };

  public getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.mulliganApiUrl + "/posts/user/" + userId);
  };

  public deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/posts/" + postId);
  }

  public createPost(postCreationRequest: PostCreationRequest): Observable<Post> {
    return this.http.post<Post>(this.mulliganApiUrl + "/posts", postCreationRequest);
  }
}
