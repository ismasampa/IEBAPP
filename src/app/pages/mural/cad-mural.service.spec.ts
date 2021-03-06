import { TestBed } from '@angular/core/testing';

import { CadMuralService } from './cad-mural.service';

describe('CadMuralService', () => {
  let service: CadMuralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadMuralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
