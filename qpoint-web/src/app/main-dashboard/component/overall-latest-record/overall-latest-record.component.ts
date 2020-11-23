import {Component, Input, OnInit} from '@angular/core';
import {NzTableSortFn} from "ng-zorro-antd";
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";
import {MainDashboardService} from "../../service/main-dashboard.service";

@Component({
  selector: 'app-overall-latest-record',
  templateUrl: './overall-latest-record.component.html',
  styleUrls: ['./overall-latest-record.component.css']
})
export class OverallLatestRecordComponent implements OnInit {

  @Input() overallBehaviourRecords: StudentBehaviourRecordVoModel[];

  constructor(private mainDashboardService: MainDashboardService) {
  }

  sortFn: NzTableSortFn = (a: StudentBehaviourRecordVoModel, b: StudentBehaviourRecordVoModel) => {
    return (new Date(a.dateGiven).getTime() - new Date(b.dateGiven).getTime());
  }

  ngOnInit(): void {
    this.mainDashboardService.getOverallStudentBehaviourRecords().subscribe(res => {
      if (res) {
        this.overallBehaviourRecords = res;
      }
    })
  }

}
