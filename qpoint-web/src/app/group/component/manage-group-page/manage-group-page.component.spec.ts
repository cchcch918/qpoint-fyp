import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageGroupPageComponent} from './manage-group-page.component';

describe('ManageGroupPageComponent', () => {
  let component: ManageGroupPageComponent;
  let fixture: ComponentFixture<ManageGroupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageGroupPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
