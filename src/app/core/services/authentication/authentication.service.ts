import { Injectable } from '@angular/core';
import { UserCreationRequest } from '../../models/user/user-creation.request';
import { environments } from '../../environments/environments';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest } from '../../models/user/user-login.request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // readonly mulliganApiUrl = environments.mulliganLocalApi;
  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>

  // constructor(private http: HttpClient) {
  //   this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  //   this.user = this.userSubject.asObservable();
  // }

  // public register(userCreationRequest: UserCreationRequest): Observable<User> {
  //   return this.http.post<User>(this.mulliganApiUrl + "/User", userCreationRequest)
  //     .pipe(map(user => {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //     }));
  // }

  // public login(userLoginRequest: UserLoginRequest) {
  //   return this.http.post<User>(this.mulliganApiUrl + "/User/authenticate", userLoginRequest);
  // }

  // public logout() {

  // }

  // public authenticate() {

  // }

}
