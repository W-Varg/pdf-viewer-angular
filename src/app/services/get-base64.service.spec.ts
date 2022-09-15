import { TestBed } from '@angular/core/testing';

import { GetBase64Service } from './get-base64.service';

describe('GetBase64Service', () => {
  let service: GetBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
