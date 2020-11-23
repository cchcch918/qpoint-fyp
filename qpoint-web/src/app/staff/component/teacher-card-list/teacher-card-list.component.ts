import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../service/staff.service";
import {TeachersActivitiesVoModel} from "../../model/teachers-activities-vo.model";

@Component({
  selector: 'app-teacher-card-list',
  templateUrl: './teacher-card-list.component.html',
  styleUrls: ['./teacher-card-list.component.css']
})
export class TeacherCardListComponent implements OnInit {
  dateFilter?: string = "1Y";
  dateFilterNodes = [
    {
      title: 'Whole Year',
      key: '1Y',
    },
    {
      title: 'Today',
      key: '1D',
    },
    {
      title: 'Last Week',
      key: '7D',
    },
    {
      title: 'Last Month',
      key: '1M',
    },
    {
      title: 'Last Two Months',
      key: '2M',
    },
    {
      title: 'Last Three Months',
      key: '3M',
    },
  ];

  sortFilter?: string = "id";
  sortByNodes = [
    {
      title: 'Sort by ID',
      key: 'id',
    },
    {
      title: 'Sort by names',
      key: 'name',
    },
    {
      title: 'Sort by scan count',
      key: 'scanCount',
    },
    {
      title: 'Sort by points awarded',
      key: 'pointsAwarded',
    },
  ]

  teacherActivityList: TeachersActivitiesVoModel[];
  teachersActivitiesLoading: boolean;

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    this.updateTeachersActivitiesList(this.dateFilter, this.sortFilter);
  }

  updateTeachersActivitiesList(dateFilter: string, sortBy: string) {
    let payload = {dateFilter: dateFilter, sortBy: sortBy};
    this.teachersActivitiesLoading = true
    this.staffService.getTeachersActivitiesList(payload).subscribe(res => {
        if (res) {
          this.teacherActivityList = res;
          this.teachersActivitiesLoading = false;
        }
      }
    )
  }

  showActivityDetails(staffId: number) {
    this.staffService.sendOpenActivityDetailsModalEvent({staffId: staffId, dateFilter: this.dateFilter});
  }

  selectOnChange(event: string): void {
    this.updateTeachersActivitiesList(this.dateFilter, this.sortFilter);
  }


}
