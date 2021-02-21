import { TestBed } from '@angular/core/testing';
import { JunoService } from './juno.service';

describe('JunoService', () => {
  let service: JunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
