import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy  {
  collapsed = true;
  faCartPlus =faCartPlus;
  public userSubscription : Subscription;  
  isAuthenticated = false;
  isLunchLady = false ;

  constructor(
    private orderService : OrderService,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe((user) => {
      // user = null || User entity
      // this.isAuthenticated = !user ? false : true;
      // console.log(user.isLunchLady);
      this.isAuthenticated = !!user;
      this.isLunchLady = user?.isLunchLady;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
