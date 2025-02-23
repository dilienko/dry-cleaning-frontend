import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NewOrderComponent } from './new-order/new-order.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StatusListComponent } from './status-list/status-list.component';
import { StatsComponent } from './stats/stats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  {
    path: 'new-order',
    component: NewOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'services',
    component: ServiceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'status',
    component: StatusListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];
