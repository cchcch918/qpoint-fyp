import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateStaffFormComponent} from './create-staff-form.component';

describe('CreateStaffFormComponent', () => {
  let component: CreateStaffFormComponent;
  let fixture: ComponentFixture<CreateStaffFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStaffFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
