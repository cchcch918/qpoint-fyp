import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClassService} from "../../service/class.service";

@Component({
  selector: 'app-class-leaderboard',
  templateUrl: './class-leaderboard.component.html',
  styleUrls: ['./class-leaderboard.component.css']
})
export class ClassLeaderboardComponent implements OnInit, OnChanges {

  ranking: any[];
  @Input() classId: number;

  constructor(private classService: ClassService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.classId) {
      if (this.classId) {
        const payload = {classId: this.classId, rankingNumber: 10};
        this.classService.getStudentRankingByClass(payload).subscribe(res => {
          if (res) {
            this.ranking = res
          }
        })
      }
    }
  }

}
