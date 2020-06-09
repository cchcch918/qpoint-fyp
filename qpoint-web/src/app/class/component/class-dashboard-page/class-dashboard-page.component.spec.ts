import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassDashboardPageComponent} from './class-dashboard-page.component';

describe('ClassDashboardPageComponent', () => {
  let component: ClassDashboardPageComponent;
  let fixture: ComponentFixture<ClassDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDashboardPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
