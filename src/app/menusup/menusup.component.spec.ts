import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusupComponent } from './menusup.component';

describe('MenusupComponent', () => {
  let component: MenusupComponent;
  let fixture: ComponentFixture<MenusupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
