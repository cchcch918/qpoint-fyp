import {Component, Input, OnInit} from '@angular/core';
import {NzTableSortFn} from "ng-zorro-antd";
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";

@Component({
  selector: 'app-group-latest-record',
  templateUrl: './group-latest-record.component.html',
  styleUrls: ['./group-latest-record.component.css']
})
export class GroupLatestRecordComponent implements OnInit {
  @Input() behaviourRecordsByGroup: StudentBehaviourRecordVoModel[];

  constructor() {
  }

  ngOnInit(): void {
  }

  sortFn: NzTableSortFn = (a: StudentBehaviourRecordVoModel, b: StudentBehaviourRecordVoModel) => {
    return (new Date(a.dateGiven).getTime() - new Date(b.dateGiven).getTime());
  }

}
