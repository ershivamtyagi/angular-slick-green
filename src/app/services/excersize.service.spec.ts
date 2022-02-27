import { TestBed } from '@angular/core/testing';

import { ExcersizeService } from './excersize.service';

describe('ExcersizeService', () => {
  let service: ExcersizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcersizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
