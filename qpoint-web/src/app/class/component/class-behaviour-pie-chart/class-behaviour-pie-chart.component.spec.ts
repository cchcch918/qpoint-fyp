import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassBehaviourPieChartComponent} from './class-behaviour-pie-chart.component';

describe('ClassBehaviourPieChartComponent', () => {
  let component: ClassBehaviourPieChartComponent;
  let fixture: ComponentFixture<ClassBehaviourPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassBehaviourPieChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassBehaviourPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
