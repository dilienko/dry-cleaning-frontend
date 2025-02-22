import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NewOrderComponent } from './new-order/new-order.component';
import { ServiceListComponent } from './service-list/service-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  {
    path: 'new-order',
    component: NewOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-order/services',
    component: ServiceListComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];
