import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralComponent } from './central.component';

describe('CentralComponent', () => {
  let component: CentralComponent;
  let fixture: ComponentFixture<CentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
