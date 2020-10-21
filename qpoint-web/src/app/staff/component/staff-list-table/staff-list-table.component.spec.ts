import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StaffListTableComponent} from './staff-list-table.component';

describe('StaffListTableComponent', () => {
  let component: StaffListTableComponent;
  let fixture: ComponentFixture<StaffListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
