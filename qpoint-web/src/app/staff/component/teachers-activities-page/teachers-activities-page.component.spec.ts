import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeachersActivitiesPageComponent} from './teachers-activities-page.component';

describe('TeachersActivitiesPageComponent', () => {
  let component: TeachersActivitiesPageComponent;
  let fixture: ComponentFixture<TeachersActivitiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersActivitiesPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
