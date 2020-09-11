import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupLatestRecordComponent} from './group-latest-record.component';

describe('GroupLatestRecordComponent', () => {
  let component: GroupLatestRecordComponent;
  let fixture: ComponentFixture<GroupLatestRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupLatestRecordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLatestRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
