import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageNotificationPageComponent} from './manage-notification-page.component';

describe('ManageNotificationPageComponent', () => {
  let component: ManageNotificationPageComponent;
  let fixture: ComponentFixture<ManageNotificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNotificationPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
