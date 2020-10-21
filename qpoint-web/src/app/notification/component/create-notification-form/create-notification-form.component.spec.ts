import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateNotificationFormComponent} from './create-notification-form.component';

describe('CreateNotificationFormComponent', () => {
  let component: CreateNotificationFormComponent;
  let fixture: ComponentFixture<CreateNotificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNotificationFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
