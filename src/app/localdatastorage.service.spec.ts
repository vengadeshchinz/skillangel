import { TestBed } from '@angular/core/testing';

import { LocaldatastorageService } from './localdatastorage.service';

describe('LocaldatastorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaldatastorageService = TestBed.get(LocaldatastorageService);
    expect(service).toBeTruthy();
  });
});
