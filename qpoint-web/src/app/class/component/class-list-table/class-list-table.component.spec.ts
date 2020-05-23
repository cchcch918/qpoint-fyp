import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassListTableComponent} from './class-list-table.component';

describe('ClassListTableComponent', () => {
  let component: ClassListTableComponent;
  let fixture: ComponentFixture<ClassListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
