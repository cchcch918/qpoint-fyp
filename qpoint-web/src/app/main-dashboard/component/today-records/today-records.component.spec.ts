import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodayRecordsComponent} from './today-records.component';

describe('TodayRecordsComponent', () => {
  let component: TodayRecordsComponent;
  let fixture: ComponentFixture<TodayRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodayRecordsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
