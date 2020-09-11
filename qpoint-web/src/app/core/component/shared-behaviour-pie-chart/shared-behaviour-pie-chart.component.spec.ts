import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedBehaviourPieChartComponent} from './shared-behaviour-pie-chart.component';

describe('ClassBehaviourPieChartComponent', () => {
  let component: SharedBehaviourPieChartComponent;
  let fixture: ComponentFixture<SharedBehaviourPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBehaviourPieChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBehaviourPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
