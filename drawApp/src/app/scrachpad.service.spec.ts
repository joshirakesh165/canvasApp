import { TestBed } from '@angular/core/testing';

import { ScrachpadService } from './scrachpad.service';

describe('ScrachpadService', () => {
  let service: ScrachpadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrachpadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
