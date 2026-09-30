import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardOverviewComponent } from './features/dashboard/components/dashboard-overview/dashboard-overview.component';
import { LotListComponent } from './features/lots/components/lot-list/lot-list.component';
import { LotCreateComponent } from './features/lots/components/lot-create/lot-create.component';
import { DeviationListComponent } from './features/deviations/components/deviation-list/deviation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardOverviewComponent },
  { path: 'lots', component: LotListComponent },
  { path: 'lots/new', component: LotCreateComponent },
  { path: 'deviations', component: DeviationListComponent }
];
