import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupListTableComponent} from './group-list-table.component';

describe('GroupListTableComponent', () => {
  let component: GroupListTableComponent;
  let fixture: ComponentFixture<GroupListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
