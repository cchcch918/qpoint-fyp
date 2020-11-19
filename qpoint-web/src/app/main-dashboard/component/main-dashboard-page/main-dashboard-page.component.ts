import {Component, OnInit} from '@angular/core';
import {MainDashboardService} from "../../service/main-dashboard.service";

@Component({
  selector: 'app-main-dashboard-page',
  templateUrl: './main-dashboard-page.component.html',
  styleUrls: ['./main-dashboard-page.component.css']
})
export class MainDashboardPageComponent implements OnInit {

  studentRanking: any[];
  classRanking: any[];
  groupRanking: any[];

  constructor(private mainDashboardService: MainDashboardService) {
  }

  ngOnInit(): void {
    this.mainDashboardService.getOverallRanking().subscribe(res => {
      this.studentRanking = res.studentRanking;
      this.classRanking = res.classRanking;
      this.groupRanking = res.groupRanking;
    })

  }

}
