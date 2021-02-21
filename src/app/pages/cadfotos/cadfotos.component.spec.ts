import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadfotosComponent } from './cadfotos.component';

describe('CadfotosComponent', () => {
  let component: CadfotosComponent;
  let fixture: ComponentFixture<CadfotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadfotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadfotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
