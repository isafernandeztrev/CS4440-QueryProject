import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { MetricsdashboardComponent } from './components/metricsdashboard/metricsdashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'metricsdashboard', component: MetricsdashboardComponent }
];
