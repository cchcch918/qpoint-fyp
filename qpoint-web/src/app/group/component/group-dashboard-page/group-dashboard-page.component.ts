import {Component, OnInit} from '@angular/core';
import {GroupVoModel} from "../../model/GroupVoModel";
import {GroupService} from "../../service/group.service";
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";

@Component({
  selector: 'app-group-dashboard-page',
  templateUrl: './group-dashboard-page.component.html',
  styleUrls: ['./group-dashboard-page.component.css']
})
export class GroupDashboardPageComponent implements OnInit {

  selectedGroupId: number;
  allGroups: GroupVoModel[];
  behaviourRecordsByGroup: StudentBehaviourRecordVoModel[];


  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.showAllGroups().subscribe(res => {
      if (res) {
        this.allGroups = res;
      }
    })
  }

  showDashboard(event) {
    this.selectedGroupId = event;
    if (this.selectedGroupId) {
      const payload = {groupId: this.selectedGroupId}
      this.groupService.getStudentBehaviouralRecordsByGroup(payload).subscribe(res => {
        this.behaviourRecordsByGroup = res;
      })
    }
  }

}
