import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenService} from './token.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActiveService implements CanActivate {


  isLoggedIn = false;

  constructor(private tokenStorageService: TokenService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/admin/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
