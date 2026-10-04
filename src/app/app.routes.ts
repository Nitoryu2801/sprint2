import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardOverviewComponent } from './features/dashboard/components/dashboard-overview/dashboard-overview.component';
import { LotListComponent } from './features/lots/components/lot-list/lot-list.component';
import { LotCreateComponent } from './features/lots/components/lot-create/lot-create.component';
import { LotDetailComponent } from './features/lots/components/lot-detail/lot-detail.component';
import { DeviationListComponent } from './features/deviations/components/deviation-list/deviation-list.component';
import { DeviationCreateComponent } from './features/deviations/components/deviation-create/deviation-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardOverviewComponent },
  { path: 'lots', component: LotListComponent },
  { path: 'lots/new', component: LotCreateComponent },
  { path: 'lots/:id', component: LotDetailComponent },
  { path: 'deviations', component: DeviationListComponent },
  { path: 'deviations/new', component: DeviationCreateComponent }
];
