import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

// Prevent user to access routes (see app-routing.m.ts for the routes)
// A guard should return true (grant access) or false (deny access)
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // URL Tree => redirect user when the URL visited is blocked
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.userSubject.pipe(
      // We dont want an ongoing user subscription => Use Take
      // Take the latest user value and then unsubscribe
      take(1),
      // user holds NULL or User instance
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          // Grant access to route
          return true; 
        }
        // Deny access and redirect
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
