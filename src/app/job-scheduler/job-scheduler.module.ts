import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThfPageJobSchedulerModule } from '@totvs/thf-templates/components/thf-page-job-scheduler';
import { JobSchedulerComponent } from './job-scheduler.component';
import { JobSchedulerRoutingModule } from './job-scheduler-routing.module';

@NgModule({
  declarations: [JobSchedulerComponent],
  imports: [
    CommonModule,
    ThfPageJobSchedulerModule,
    JobSchedulerRoutingModule
  ]
})
export class JobSchedulerModule { }
