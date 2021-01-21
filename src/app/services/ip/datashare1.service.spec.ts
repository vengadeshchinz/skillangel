import { TestBed } from '@angular/core/testing';

import { Datashare1Service } from './datashare1.service';

describe('Datashare1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Datashare1Service = TestBed.get(Datashare1Service);
    expect(service).toBeTruthy();
  });
});
