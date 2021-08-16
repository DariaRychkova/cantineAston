import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

// When an http outgoing request is sent (login/signup/post/get), interceptor adds to it an "auth token"
// Add interceptor to app.module.ts
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // userSubject is a behavior subject, can retrieve data(user) on demand
    return this.authService.userSubject.pipe(
      // Take => gives the latest user (saved on login/signup), we get the user on demand when fetchRecipes is called
      // Take only 1 value from the observable, then automatically unsubscribe
      take(1),
      // exhaustMap => It waits for the 1st obs(userSubject) to complete, it gets the user. 
      // Inside we return the "http obs" which replaces our 1st obs(userSubject)
      exhaustMap((user) => {
        // For http request login/signup the user is null => error on user.token
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // params: new HttpParams().set('auth', user.token),
          headers: new HttpHeaders().set('authorization', user.token )
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
