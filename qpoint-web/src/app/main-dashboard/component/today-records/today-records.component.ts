import {Component, OnInit} from '@angular/core';
import {MainDashboardService} from "../../service/main-dashboard.service";

@Component({
  selector: 'app-today-records',
  templateUrl: './today-records.component.html',
  styleUrls: ['./today-records.component.css']
})
export class TodayRecordsComponent implements OnInit {

  todayRecordsCount: number;
  positivePoints: number;
  negativePoints: number;
  highlightedBehaviour: string = "-";

  constructor(private mainDashboardService: MainDashboardService) {
  }

  ngOnInit(): void {
    this.mainDashboardService.getTodayRecordDetails().subscribe(res => {
      this.todayRecordsCount = res.todayRecordsCount;
      this.positivePoints = res.positivePoints;
      this.negativePoints = res.negativePoints;
      this.highlightedBehaviour = res?.highlightedBehaviour;
    })
  }

}
