import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private preLoginService: LoginService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.preLoginService.token;
    if (token) {
      // logged in so return true;
      console.log('token true');
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/pre-login'], {queryParams: {returnUrl: state.url}});
    console.log('token false');

    return false;
  }

}


