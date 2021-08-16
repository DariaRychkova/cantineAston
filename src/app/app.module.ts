import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlatItemComponent } from './plats/plat-item/plat-item.component';
import { PlatsService } from './plats/plats-service';
import { PlatsComponent } from './plats/plats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderService } from './orders/order.service';
import { MealsService } from './meals/meals-service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { OrderComponent } from './orders/order.component';
import { MealItemComponent } from './plats/meal-item/meal-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlatsComponent,
    PlatItemComponent,
    OrderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    MealItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    PlatsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MealsService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
