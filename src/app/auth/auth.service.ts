import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface userResponseData {
  address:string
  email: string
  firstname: string
  id: number
  imageId: number
  isLunchLady: boolean
  name: string
  phone: string
  postalCode: string
  registrationDate: string
  sex: number
  status: number
  town: string
  wallet: number
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Behaviour subject, initialized with 'null' value;
  // Gives subscribers immediate access to the previously emitted value
  // even if they haven’t subscribed at the point of time that value was emitted.
  userSubject = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN
  login(email: string, password: string) {
    // Create POST body
    const userData = { email : email, password: password };
    return (
      this.http
        .post(
          'http://localhost:8080/lunchtime/login',
          userData,
          { observe: 'response' }
        )
        .pipe(
          // catchError gets as arg an anonymous function
          // OR a function (handleError) which will automatically receive as arg the HTTP error response
          catchError(this.handleError),
          tap((respData) => {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(respData.headers.get('authorization'));
            // console.log(decodedToken);
            this.handleAuthentication(
              decodedToken.user.email,
              +decodedToken.user.id,
              respData.headers.get('authorization'), // token
              decodedToken.user.isLunchLady
            );
          })
        )
    );
  }

  // Logout
  logout() {
    this.userSubject.next(null); // null is initial state in our app
    localStorage.removeItem('userData');
    // check if we have an active timer
    this.router.navigate(['/auth']);
  }

  // Called by LOGIN and SIGNUP
  private handleAuthentication(
    email: string,
    userId: number,
    token: string,
    isLunchLady: boolean
  ) {
    const user = new User(email, userId, token, isLunchLady);
    // Send user to Subject
    this.userSubject.next(user);
    // Store user in our Local Storage to keep the user signed in on page reload
    // We have to convert it to a string
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Error handling for login
  private handleError(errorRes: HttpErrorResponse) {
    // Default message
    let errorMessage = 'Une erreur est survenue';
    if (errorRes.error.status == 401 ) {
      // Throw an observable that wraps the default message
      errorMessage = 'L\'email ou le mot de passe est incorect.';
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
}
