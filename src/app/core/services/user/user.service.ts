import { Injectable } from '@angular/core';
import { ennvironments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { AddUser } from '../../models/user/add-user.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly mulliganApiUrl = ennvironments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllUsers(callback: (users: User[]) => void): void {
    this.http.get<User[]>(this.mulliganApiUrl + "/Users").
      subscribe((users: User[]) => {
        callback(users);
      });
  }
  public getUserById(id : string) {
    return this.http.get<User>(this.mulliganApiUrl + "/Users/" + id);
  };

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Users/" + id);
  }
  
  public updateUser(id: string, user: AddUser): Observable<User> {
    return this.http.put<User>(this.mulliganApiUrl + "/Users/" + id, user);
  }

  public addUser(user: AddUser, callback:() => void): void {
    this.http.post<User>(this.mulliganApiUrl + "/Users", user).
      subscribe((data) => {
        callback();
      });
  }
}
