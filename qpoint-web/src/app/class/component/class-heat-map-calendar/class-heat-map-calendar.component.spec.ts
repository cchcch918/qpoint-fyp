import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassHeatMapCalendarComponent} from './class-heat-map-calendar.component';

describe('ClassHeatMapCalendarComponent', () => {
  let component: ClassHeatMapCalendarComponent;
  let fixture: ComponentFixture<ClassHeatMapCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassHeatMapCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassHeatMapCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
