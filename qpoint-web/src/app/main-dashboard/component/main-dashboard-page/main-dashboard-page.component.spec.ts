import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainDashboardPageComponent} from './main-dashboard-page.component';

describe('MainDashboardPageComponent', () => {
  let component: MainDashboardPageComponent;
  let fixture: ComponentFixture<MainDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainDashboardPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
