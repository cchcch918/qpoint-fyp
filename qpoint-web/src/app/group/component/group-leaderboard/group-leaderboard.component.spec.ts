import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupLeaderboardComponent} from './group-leaderboard.component';

describe('GroupLeaderboardComponent', () => {
  let component: GroupLeaderboardComponent;
  let fixture: ComponentFixture<GroupLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupLeaderboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
