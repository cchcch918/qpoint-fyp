import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageStudentPageComponent} from './manage-student-page.component';

describe('ManageStudentPageComponent', () => {
  let component: ManageStudentPageComponent;
  let fixture: ComponentFixture<ManageStudentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStudentPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
