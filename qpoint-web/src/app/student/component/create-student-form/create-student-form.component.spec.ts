import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateStudentFormComponent} from './create-student-form.component';

describe('CreateStudentFormComponent', () => {
  let component: CreateStudentFormComponent;
  let fixture: ComponentFixture<CreateStudentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
