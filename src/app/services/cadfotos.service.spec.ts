import { TestBed } from '@angular/core/testing';

import { CadfotosService } from './cadfotos.service';

describe('CadfotosService', () => {
  let service: CadfotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadfotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
