import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditComponent } from './order-edit.component';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
