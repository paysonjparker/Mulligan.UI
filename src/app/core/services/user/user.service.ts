import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { UserCreationRequest } from '../../models/user/user-creation.request';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../../models/user/user-update.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getUserById(userId: string): Observable<User> {
    const url = `${this.mulliganApiUrl}/User/${userId}`
    return this.http.get<User>(url);
  }

  public deleteUser(userId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mulliganApiUrl + "/User/" + userId);
  }

  public updateUser(userId: string, userUpdateRequest: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(this.mulliganApiUrl + "/User/" + userId, userUpdateRequest);
  }

  public createUser(userCreationRequest: UserCreationRequest): Observable<User> {
    return this.http.post<User>(this.mulliganApiUrl + "/User", userCreationRequest);
  }

  public getAllUsers(): Observable<User[]> {
    const url = `${this.mulliganApiUrl}/User`;

    return this.http.get<User[]>(url);
  }

  public getAllUsersByGolfCourseId(golfCourseId: string): Observable<User[]> {
    const url = `${this.mulliganApiUrl}/User/golfCourse/${golfCourseId}`;

    return this.http.get<User[]>(url);
  }
}
