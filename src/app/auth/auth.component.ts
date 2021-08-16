import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoading = false;
  errorMessage: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(authForm: NgForm) {
    // if form is invalid => Do nothing
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    // Activate spinner
    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (resData) => {
        this.isLoading = false;
        // Redirect to recipes page
        this.router.navigate(['/plats']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  // Close error overlay + backdrop
  onHandleClose() {
    this.errorMessage = null;
  }
}