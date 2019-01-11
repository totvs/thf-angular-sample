import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSchedulerComponent } from './job-scheduler.component';

describe('JobSchedulerComponent', () => {
  let component: JobSchedulerComponent;
  let fixture: ComponentFixture<JobSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
