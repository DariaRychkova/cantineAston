import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { OrderComponent } from './orders/order.component';
import { PlatsComponent } from './plats/plats.component';

const routes: Routes = [
  { path: '', redirectTo: '/plats', pathMatch: 'full' },
  {
    path: 'plats',
    component: PlatsComponent,
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
