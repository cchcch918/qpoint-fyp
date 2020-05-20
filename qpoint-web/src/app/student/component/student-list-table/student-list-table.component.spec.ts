import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentListTableComponent} from './student-list-table.component';

describe('StudentListTableComponent', () => {
  let component: StudentListTableComponent;
  let fixture: ComponentFixture<StudentListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
