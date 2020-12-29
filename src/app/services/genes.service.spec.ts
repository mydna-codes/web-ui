import { TestBed } from '@angular/core/testing';

import { GenesService } from './genes.service';

describe('GenesServiceService', () => {
  let service: GenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
