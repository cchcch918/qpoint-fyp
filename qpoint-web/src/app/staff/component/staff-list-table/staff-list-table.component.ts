import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {StaffVoModel} from "../../../pre-login/model/staff-vo.model";
import {StaffService} from "../../service/staff.service";
import {Subscription} from "rxjs";

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
  width?: string;
}

@Component({
  selector: 'app-staff-list-table',
  templateUrl: './staff-list-table.component.html',
  styleUrls: ['./staff-list-table.component.css']
})


export class StaffListTableComponent implements OnInit {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Staff Id',
      sortOrder: 'descend',
      sortFn: (a: StaffVoModel, b: StaffVoModel) => a.staffId - b.staffId,
      width: "10vh",
    },
    {
      name: 'Username',
      sortOrder: null,
      sortFn: (a: StaffVoModel, b: StaffVoModel) => a.username.localeCompare(b.username),
      filterMultiple: true,
      filterFn: (list: string[], item: StudentVoModel) => list.some(name => item.fullName.indexOf(name) !== -1),
      width: "16vh",

    },
    {
      name: 'Date Created',
      sortOrder: null,
      sortFn: (a: StaffVoModel, b: StaffVoModel) => {
        return (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
      },
      width: "15vh",
    },
    {
      name: 'Email',
      sortFn: (a: StaffVoModel, b: StaffVoModel) => a.email.localeCompare(b.email),

    },
    {
      name: 'Role',
      sortFn: (a: StaffVoModel, b: StaffVoModel) => a.isAdmin?.localeCompare(b.isAdmin),
    }
    ,
    {
      name: 'Action',
      width: "7vh",
    },
  ];

  subscription: Subscription;

  staffs: StaffVoModel[];
  staffsDisplay: StaffVoModel[];
  tableLoading: boolean;

  constructor(private staffService: StaffService, private msg: NzMessageService) {
  }

  ngOnInit(): void {


    this.updateStaffData();
    this.subscription = this.staffService.getCreateStaffEvent().subscribe(res => {
      if (res) {
        this.updateStaffData();
      }
    })

  }

  updateStaffData() {
    this.tableLoading = true;
    this.staffService.showAllStaffs().subscribe(res => {
      if (res) {
        this.staffs = res;
        this.staffsDisplay = res;
      }
      this.tableLoading = false;
    })
  }

  deleteStaff(staff: StaffVoModel) {
    let payload = {staffId: staff.staffId}
    if (staff.isAdmin === "Y") {
      this.msg.error(`Admin can't be deleted.`)
      return;
    }
    this.staffService.deleteStaff(payload).subscribe(res => {
      if (res) {
        this.updateStaffData();
        this.msg.success(`Staff ${staff.username} deleted`)
      }
    }, error => {
      this.msg.error(`Failed please try again`)
    })
  }
}
