import { Injectable } from '@angular/core';
import { ennvironments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { AddUser } from '../../models/user/add-user.request';
import { Observable } from 'rxjs';
import { UpdateUser } from '../../models/user/update-user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly mulliganApiUrl = ennvironments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  // public getUserById(id: string) {
  //   return this.http.get<User>(this.mulliganApiUrl + "/Users/" + id);
  // };

  public getUserById(id: string): Observable<User> {
    const url = `${this.mulliganApiUrl}/Users/${id}`
    return this.http.get<User>(url);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Users/" + id);
  }

  public updateUser(id: string, user: UpdateUser): Observable<User> {
    return this.http.put<User>(this.mulliganApiUrl + "/Users/" + id, user);
  }

  public addUser(user: AddUser): Observable<User> {
    return this.http.post<User>(this.mulliganApiUrl + "/Users", user);
  }

  public getAllUsers(): Observable<User[]> {
    const url = `${this.mulliganApiUrl}/Users`;

    return this.http.get<User[]>(url);
  }
}
