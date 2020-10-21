import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageStaffPageComponent} from './manage-staff-page.component';

describe('ManageStaffPageComponent', () => {
  let component: ManageStaffPageComponent;
  let fixture: ComponentFixture<ManageStaffPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStaffPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStaffPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
