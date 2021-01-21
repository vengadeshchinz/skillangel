import { TestBed } from '@angular/core/testing';

import { SkillkitService } from './skillkit.service';

describe('SkillkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillkitService = TestBed.get(SkillkitService);
    expect(service).toBeTruthy();
  });
});
