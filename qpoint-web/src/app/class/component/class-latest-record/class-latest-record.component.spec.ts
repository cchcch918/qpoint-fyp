import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassLatestRecordComponent} from './class-latest-record.component';

describe('ClassLatestRecordComponent', () => {
  let component: ClassLatestRecordComponent;
  let fixture: ComponentFixture<ClassLatestRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassLatestRecordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLatestRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
