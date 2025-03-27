import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {

  constructor(private authService: AuthenticationService,
              private router: Router,) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.roles.includes("ADMIN")) {
      return true;
    } else {
      this.router.navigate(['/admin/notAuthorized']);
      return false;

    }
  }
}
