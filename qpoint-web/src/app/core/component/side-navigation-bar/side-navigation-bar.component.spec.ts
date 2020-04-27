import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideNavigationBarComponent} from './side-navigation-bar.component';

describe('SideNavigationBarComponent', () => {
  let component: SideNavigationBarComponent;
  let fixture: ComponentFixture<SideNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavigationBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
