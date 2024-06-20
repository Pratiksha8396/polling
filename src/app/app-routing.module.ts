import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollComponent } from './poll/poll.component';
import { PollResultsComponent } from './poll-results/poll-results.component';

const routes: Routes = [
  {
    path: '',
    component: PollComponent,
  },
  {
    path: 'results',
    component: PollResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
