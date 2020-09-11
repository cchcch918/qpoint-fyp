import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedBehaviourHeatMapCalendarComponent} from './shared-behaviour-heat-map-calendar.component';

describe('ClassHeatMapCalendarComponent', () => {
  let component: SharedBehaviourHeatMapCalendarComponent;
  let fixture: ComponentFixture<SharedBehaviourHeatMapCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBehaviourHeatMapCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBehaviourHeatMapCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
