import { TestBed } from '@angular/core/testing';

import { JunoCardService } from './juno-card.service';

describe('JunoCardService', () => {
  let service: JunoCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JunoCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
