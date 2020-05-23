import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateClassFormComponent} from './create-class-form.component';

describe('CreateClassFormComponent', () => {
  let component: CreateClassFormComponent;
  let fixture: ComponentFixture<CreateClassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClassFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
