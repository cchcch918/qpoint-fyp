import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-group-leaderboard',
  templateUrl: './group-leaderboard.component.html',
  styleUrls: ['./group-leaderboard.component.css']
})
export class GroupLeaderboardComponent implements OnInit, OnChanges {

  @Input() groupId: number;

  ranking: any;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groupId) {
      if (this.groupId) {
        const payload = {groupId: this.groupId, rankingNumber: 5};
        this.groupService.getStudentRankingByGroup(payload).subscribe(res => {
          if (res) {
            this.ranking = res
          }
        })
      }
    }
  }
}
