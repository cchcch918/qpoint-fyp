import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityDetailsModalComponent} from './activity-details-modal.component';

describe('ActivityDetailsModalComponent', () => {
  let component: ActivityDetailsModalComponent;
  let fixture: ComponentFixture<ActivityDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityDetailsModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
