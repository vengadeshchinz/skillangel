import { TestBed } from '@angular/core/testing';

import { LoginAPIService } from './login-api.service';

describe('LoginAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAPIService = TestBed.get(LoginAPIService);
    expect(service).toBeTruthy();
  });
});
