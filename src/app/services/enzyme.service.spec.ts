import { TestBed } from '@angular/core/testing';

import { EnzymeService } from './enzyme.service';

describe('EnzymeService', () => {
  let service: EnzymeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnzymeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
