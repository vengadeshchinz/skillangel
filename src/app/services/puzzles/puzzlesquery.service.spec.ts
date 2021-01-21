import { TestBed } from '@angular/core/testing';

import { PuzzlesqueryService } from './puzzlesquery.service';

describe('PuzzlesqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuzzlesqueryService = TestBed.get(PuzzlesqueryService);
    expect(service).toBeTruthy();
  });
});
