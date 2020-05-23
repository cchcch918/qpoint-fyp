import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageClassPageComponent} from './manage-class-page.component';

describe('ManageClassPageComponent', () => {
  let component: ManageClassPageComponent;
  let fixture: ComponentFixture<ManageClassPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageClassPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
