import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {

  //Variable to store the requested URL
  url: UrlTree = this.router.parseUrl('/');

  //Path Config Details
  // pathConfig!: PathConfig[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    debugger;
    this.url = this.router.parseUrl(state.url);
    if (!this.authenticationService.hasValidAuthToken()) {
      this.router.navigate(['/']);
      return false;
    }

    // Check routes user needs to be logged in for
    if ((route.routeConfig?.path?.includes('users') || route.routeConfig?.path?.includes('post')) && route.params['Id'] && route.params['Id'] !== JSON.parse(localStorage.getItem('User')!).id) {
      this.router.navigate(['/']);
      return false;
    }

    // if (this.url.queryParams.hasOwnProperty('Id')) {
    //   if (localStorage.getItem('User') !== null && localStorage.getItem('User') !== this.url.queryParams['Id']) {
    //     return false;
    //   }
    // }

    // for (let i = 0; i < this.pathConfig.length; i++) {
    //   if ((route.routeConfig?.path === this.pathConfig[i].pathName) && (!this.userInfoService.checkUserAuth(this.pathConfig[i].rbacRoleID))) {
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // }

    // Return true if all auth checks are successful
    return true;
  }
}
