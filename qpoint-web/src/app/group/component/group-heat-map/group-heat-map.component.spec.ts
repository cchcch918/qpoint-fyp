import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupHeatMapComponent} from './group-heat-map.component';

describe('GroupHeatMapComponent', () => {
  let component: GroupHeatMapComponent;
  let fixture: ComponentFixture<GroupHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupHeatMapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
