import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobSchedulerComponent } from './job-scheduler.component';

const routes: Routes = [
  { path: '', component: JobSchedulerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSchedulerRoutingModule { }
