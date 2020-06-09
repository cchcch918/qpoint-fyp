import {Component, Input, OnInit} from '@angular/core';
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";
import {NzTableSortFn} from "ng-zorro-antd";


@Component({
  selector: 'app-class-latest-record',
  templateUrl: './class-latest-record.component.html',
  styleUrls: ['./class-latest-record.component.css']
})
export class ClassLatestRecordComponent implements OnInit {
  @Input() behaviourRecordsByClass: StudentBehaviourRecordVoModel[];

  constructor() {
  }

  sortFn: NzTableSortFn = (a: StudentBehaviourRecordVoModel, b: StudentBehaviourRecordVoModel) => {
    return (new Date(a.dateGiven).getTime() - new Date(b.dateGiven).getTime());
  }

  ngOnInit(): void {
  }


}
