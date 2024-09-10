import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { UserCreationRequest } from '../../models/user/user-creation.request';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../../models/user/user-update.request';
import { UserSearchRequest } from '../../models/user/user-search.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getUserById(userId: string): Observable<User> {
    const url = `${this.mulliganApiUrl}/users/${userId}`
    return this.http.get<User>(url);
  }

  public deleteUser(userId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mulliganApiUrl + "/users/" + userId);
  }

  public updateUser(userId: string, userUpdateRequest: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(this.mulliganApiUrl + "/users/" + userId, userUpdateRequest);
  }

  public createUser(userCreationRequest: UserCreationRequest): Observable<User> {
    return this.http.post<User>(this.mulliganApiUrl + "/users", userCreationRequest);
  }

  public getAllUsers(): Observable<User[]> {
    const url = `${this.mulliganApiUrl}/users`;

    return this.http.get<User[]>(url);
  }

  public getAllUsersByGolfCourseId(golfCourseId: string): Observable<User[]> {
    const url = `${this.mulliganApiUrl}/users/golfCourse/${golfCourseId}`;

    return this.http.get<User[]>(url);
  }

  public searchUsers(userSearchRequest: UserSearchRequest): Observable<User[]> {
    let url = `${this.mulliganApiUrl}/users/search`;

    if (userSearchRequest.username == '' && userSearchRequest.fullName == '' && userSearchRequest.emailAddress == '' && userSearchRequest.homeCourseName == '') {
      return this.getAllUsers();
    }

    let httpQueryParams = new HttpParams();

    if (userSearchRequest.username !== undefined && userSearchRequest.username !== null && userSearchRequest.username !== '') {
      httpQueryParams = httpQueryParams.set('username', userSearchRequest.username);
    }
    if (userSearchRequest.fullName !== undefined && userSearchRequest.fullName !== null && userSearchRequest.fullName !== '') {
      httpQueryParams = httpQueryParams.set('fullName', userSearchRequest.fullName);
    }
    if (userSearchRequest.emailAddress !== undefined && userSearchRequest.emailAddress !== null && userSearchRequest.emailAddress !== '') {
      httpQueryParams = httpQueryParams.set('emailAddress', userSearchRequest.emailAddress);
    }
    if (userSearchRequest.homeCourseName !== undefined && userSearchRequest.homeCourseName !== null && userSearchRequest.homeCourseName !== '') {
      httpQueryParams = httpQueryParams.set('homeCourseName', userSearchRequest.homeCourseName);
    }

    const queryString = httpQueryParams.toString();

    url += `?${queryString}`

    console.info(url);

    return this.http.get<User[]>(url);
  }
}
