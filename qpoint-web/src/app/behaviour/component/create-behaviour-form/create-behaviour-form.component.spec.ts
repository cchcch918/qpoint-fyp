import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateBehaviourFormComponent} from './create-behaviour-form.component';

describe('CreateBehaviourFormComponent', () => {
  let component: CreateBehaviourFormComponent;
  let fixture: ComponentFixture<CreateBehaviourFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBehaviourFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBehaviourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
