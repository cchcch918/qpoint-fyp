import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedSmallCardComponent} from './shared-small-card.component';

describe('SharedSmallCardComponent', () => {
  let component: SharedSmallCardComponent;
  let fixture: ComponentFixture<SharedSmallCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedSmallCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
