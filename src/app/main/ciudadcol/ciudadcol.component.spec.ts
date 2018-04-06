import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadcolComponent } from './ciudadcol.component';

describe('CiudadcolComponent', () => {
  let component: CiudadcolComponent;
  let fixture: ComponentFixture<CiudadcolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadcolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
