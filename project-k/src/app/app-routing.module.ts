import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { ActivityOverviewComponent } from './components/activity-overview/activity-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox', component: InboxComponent },
  { path: 'starred', component: InboxComponent },
  { path: 'contacts', component: InboxComponent },
  { path: 'deleted', component: InboxComponent },
  { path: 'activity/:id', component: ActivityOverviewComponent },
  { path: '**', redirectTo: '/inbox' } // Catch all other routes and redirect to inbox
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
