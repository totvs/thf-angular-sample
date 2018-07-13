import { Injectable } from '@angular/core';

@Injectable()
export class CustomerFormGroupService {

  constructor() { }

  getStatusOptions() {
    return [
      { label: 'Cloud-Riders', value: 'cloud' },
      { label: 'Crimson Dawn', value: 'crimson' },
      { label: 'Galactic Empire', value: 'galactic' },
      { label: 'Pyke Syndicate', value: 'pyke' }
    ];
  }

}
