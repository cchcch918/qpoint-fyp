import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreLoginMainMenuComponent} from './pre-login-main-menu.component';

describe('PreLoginMainMenuComponent', () => {
  let component: PreLoginMainMenuComponent;
  let fixture: ComponentFixture<PreLoginMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreLoginMainMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
