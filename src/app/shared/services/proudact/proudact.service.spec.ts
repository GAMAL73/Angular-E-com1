import { TestBed } from '@angular/core/testing';

import { ProudactService } from './proudact.service';

describe('ProudactService', () => {
  let service: ProudactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProudactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
