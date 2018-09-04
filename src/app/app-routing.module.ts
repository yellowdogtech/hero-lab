import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './owners/owners.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: OwnerDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: OwnersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
