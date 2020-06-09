import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../service/class.service";
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";
import {ClassVoModel} from "../../model/class-vo.model";


@Component({
  selector: 'app-class-dashboard-page',
  templateUrl: './class-dashboard-page.component.html',
  styleUrls: ['./class-dashboard-page.component.css']
})

export class ClassDashboardPageComponent implements OnInit {

  behaviourRecordsByClass: StudentBehaviourRecordVoModel[];
  allClasses: ClassVoModel[];
  selectedClassId: number;

  constructor(private classService: ClassService) {

  }

  ngOnInit(): void {
    this.classService.showOnlyAllClasses().subscribe(res => {
      if (res) {
        this.allClasses = res;
      }
    })
    console.log(this.selectedClassId)
  }

  showDashboard() {
    if (this.selectedClassId) {
      const payload = {classId: this.selectedClassId}
      this.classService.getStudentBehaviouralRecordsByClass(payload).subscribe(res => {
        this.behaviourRecordsByClass = res;
      })
    }
  }
}
