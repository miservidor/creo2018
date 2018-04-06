import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulatComponent } from './menulat.component';

describe('MenulatComponent', () => {
  let component: MenulatComponent;
  let fixture: ComponentFixture<MenulatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenulatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
