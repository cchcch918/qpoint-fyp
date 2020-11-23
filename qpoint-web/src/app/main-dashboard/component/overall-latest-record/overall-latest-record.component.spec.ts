import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OverallLatestRecordComponent} from './overall-latest-record.component';

describe('OverallLatestRecordComponent', () => {
  let component: OverallLatestRecordComponent;
  let fixture: ComponentFixture<OverallLatestRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverallLatestRecordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallLatestRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
