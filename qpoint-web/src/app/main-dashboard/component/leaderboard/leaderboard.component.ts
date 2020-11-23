import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  @Input() ranking: any[];
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
