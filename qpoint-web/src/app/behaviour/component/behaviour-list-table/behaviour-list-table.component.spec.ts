import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BehaviourListTableComponent} from './behaviour-list-table.component';

describe('BehaviourListTableComponent', () => {
  let component: BehaviourListTableComponent;
  let fixture: ComponentFixture<BehaviourListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BehaviourListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviourListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
