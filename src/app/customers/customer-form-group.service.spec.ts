import { TestBed, inject } from '@angular/core/testing';

import { CustomerFormGroupService } from './customer-form-group.service';

describe('CustomerFormGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerFormGroupService]
    });
  });

  it('should be created', inject([CustomerFormGroupService], (service: CustomerFormGroupService) => {
    expect(service).toBeTruthy();
  }));
});
