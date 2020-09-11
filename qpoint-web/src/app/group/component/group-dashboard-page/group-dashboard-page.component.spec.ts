import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupDashboardPageComponent} from './group-dashboard-page.component';

describe('GroupDashboardPageComponent', () => {
  let component: GroupDashboardPageComponent;
  let fixture: ComponentFixture<GroupDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDashboardPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
