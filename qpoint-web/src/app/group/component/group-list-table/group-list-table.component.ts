import {Component, OnInit} from '@angular/core';
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {NzMessageService, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {GroupService} from "../../service/group.service";
import {forkJoin, Subscription} from "rxjs";
import {StaffService} from "../../../staff/service/staff.service";
import {StudentService} from "../../../student/service/student.service";
import {GroupVoModel} from "../../model/GroupVoModel";

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
  selector: 'app-group-list-table',
  templateUrl: './group-list-table.component.html',
  styleUrls: ['./group-list-table.component.css']
})
export class GroupListTableComponent implements OnInit {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Group Id',
      sortOrder: 'descend',
      sortFn: (a: GroupVoModel, b: GroupVoModel) => a.groupId - b.groupId,
      width: "10vh",
    },
    {
      name: 'Group Name',
      sortOrder: null,
      sortFn: (a: GroupVoModel, b: GroupVoModel) => a.groupName.localeCompare(b.groupName),
      width: "16vh",

    },
    {
      name: 'Date Created',
      sortOrder: null,
      sortFn: (a: GroupVoModel, b: GroupVoModel) => {
        return (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
      },
      width: "15vh",
    },
    {
      name: 'Students',
    },
    {
      name: 'Teacher',

    },
    {
      name: 'Action',
      width: "7vh",
    },
  ];


  allGroups: GroupVoModel[];
  allGroupsDisplay: GroupVoModel[];
  allStudents: StudentVoModel[];
  allStaffs: any[];
  tableLoading: boolean;
  subscription: Subscription;

  searchVisible: boolean = false;
  searchValue = '';

  constructor(private groupService: GroupService, private studentService: StudentService, private staffService: StaffService, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.updateGroupData();
    this.subscription = this.groupService.getCreateGroupEvent().subscribe(res => {
      if (res) {
        this.updateGroupData();
      }
    })
  }

  updateGroupData() {
    this.searchValue = '';
    this.tableLoading = true;

    let allStudents = this.studentService.showAllStudents();
    let allStaffs = this.staffService.showAllStaffs();
    let allGroups = this.groupService.showAllGroups();
    forkJoin([allStudents, allStaffs, allGroups]).subscribe(results => {
      this.allStudents = results[0];
      this.allStaffs = results[1];
      this.allGroups = results[2];

      this.allGroups.forEach(eachGroup => {
        let studentInGroup = eachGroup.students.map(student => {
          return student.studentId;
        });

        let studentsOption: Array<{ value: number; label: string }> = [];
        if (this.allStudents) {
          studentsOption = this.allStudents.map(student => {
            return {
              value: student.studentId,
              label: `${student.studentId} - ${student.fullName}`
            };
          })
        }

        let teachersOption: Array<{ value: number; label: string }> = [];
        if (this.allStaffs) {
          teachersOption = this.allStaffs.map(teacher => {
            return {
              value: teacher.staffId,
              label: `${teacher.staffId} - ${teacher.username}`
            };
          })
        }

        eachGroup['showEditStudentsColumn'] = false;
        eachGroup['studentsInGroup'] = studentInGroup;
        eachGroup['studentsOption'] = studentsOption;

        eachGroup['showEditTeachersColumn'] = false;
        eachGroup['teacherInGroup'] = eachGroup.teacher?.staffId;
        eachGroup['teachersOption'] = teachersOption;
      });
      this.allGroupsDisplay = [...this.allGroups];
      this.tableLoading = false;
    });
  }

  deleteGroup({groupId, groupName}) {
    if (!groupId) return;
    this.groupService.deleteGroup({groupId: groupId}).subscribe(res => {
      if (res) {
        this.updateGroupData();
        this.msg.success(`Group ${groupName} deleted`)
      }
    }, error => {
      this.msg.error(`Failed please try again`)
    })
  }

  idMapName(id: number, mapArray: any[]) {
    if (this.allGroups) {
      const selected = mapArray.find(object => {
        return object['value'] == id
      })
      return selected['label'];
    }
  }

  updateStudents(thisGroup: GroupVoModel) {
    const payload = {
      groupId: thisGroup.groupId,
      studentIdList: thisGroup['studentsInGroup']
    }
    this.groupService.updateStudents(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Students updated in group ${thisGroup.groupName}`)
        }
      }, error => {
        this.msg.error(`Failed please try again`)
      }
    )
  }

  updateTeacher(thisGroup: GroupVoModel) {
    const payload = {
      groupId: thisGroup.groupId,
      teacherId: thisGroup['teacherInGroup']
    }
    console.log(thisGroup);
    this.groupService.updateTeacher(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Teacher updated in group ${thisGroup.groupName}`)
        }
      }, error => {
        this.msg.error(`Failed please try again`)
      }
    )
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    this.allGroupsDisplay = this.allGroups.filter((group) => group.groupName.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) !== -1);
  }

}
