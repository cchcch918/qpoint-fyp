import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../service/staff.service";
import {StudentBehaviourRecordVoModel} from "../../../core/model/student-behaviour-record.vo.model";
import {StaffVoModel} from "../../model/staff-vo.model";


@Component({
  selector: 'app-activity-details-modal',
  templateUrl: './activity-details-modal.component.html',
  styleUrls: ['./activity-details-modal.component.css']
})
export class ActivityDetailsModalComponent implements OnInit {


  showActivityDetailsModal: boolean;
  behaviourRecordsByTeacher: StudentBehaviourRecordVoModel[];
  selectedTeacher: StaffVoModel;
  dateFilterString: string
  timelineLoading: boolean;

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.staffService.getOpenActivityDetailsModalEvent().subscribe(res => {
      if (res) {
        this.showActivityDetailsModal = true;
        this.timelineLoading = true;
        this.dateFilterString = this.showDateFilter(res.dateFilter);
        let payload1 = {staffId: res.staffId};
        this.staffService.getStaffDetailsByStaffId(payload1).subscribe(res => {
          if (res) {
            this.selectedTeacher = res;
          }
        })
        let payload2 = {staffId: res.staffId, dateFilter: res.dateFilter};
        this.staffService.getStudentBehaviourRecordsByStaff(payload2).subscribe(res => {
          if (res) {
            this.behaviourRecordsByTeacher = res;
            this.timelineLoading = false;
          }
        })
      }
    })
  }

  closeModal() {
    this.showActivityDetailsModal = false;
  }

  showDateFilter(dateFilter: string): string {
    switch (dateFilter) {
      case "1Y":
        return "Whole Year";

      case "1D":
        return "Today";

      case "7D":
        return "Last Week";

      case "1M":
        return "Last Month";

      case "2M":
        return "Last 2 Months";

      case "3M":
        return "Last 3 Months";

      default:
        return "-"
    }


  }
}
