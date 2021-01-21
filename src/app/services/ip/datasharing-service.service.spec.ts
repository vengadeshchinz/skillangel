import { TestBed } from '@angular/core/testing';

import { DatasharingServiceService } from './datasharing-service.service';

describe('DatasharingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasharingServiceService = TestBed.get(DatasharingServiceService);
    expect(service).toBeTruthy();
  });
});
