import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageBehaviourPageComponent} from './manage-behaviour-page.component';

describe('ManageBehaviourPageComponent', () => {
  let component: ManageBehaviourPageComponent;
  let fixture: ComponentFixture<ManageBehaviourPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBehaviourPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBehaviourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
