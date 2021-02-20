import { TestBed } from '@angular/core/testing';

import { JsonIPService } from './json-ip.service';

describe('JsonIPService', () => {
  let service: JsonIPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonIPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
