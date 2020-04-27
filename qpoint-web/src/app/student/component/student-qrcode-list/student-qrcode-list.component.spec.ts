import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentQrcodeListComponent} from './student-qrcode-list.component';

describe('StudentQrcodeListComponent', () => {
  let component: StudentQrcodeListComponent;
  let fixture: ComponentFixture<StudentQrcodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentQrcodeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQrcodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
