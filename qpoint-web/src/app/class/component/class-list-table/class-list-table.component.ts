import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../service/class.service";
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {NzMessageService, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {ClassVoModel} from "../../model/class-vo.model";
import {StudentService} from "../../../student/service/student.service";
import {StaffService} from "../../../staff/service/staff.service";
import {forkJoin, Subscription} from "rxjs";

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
  selector: 'app-class-list-table',
  templateUrl: './class-list-table.component.html',
  styleUrls: ['./class-list-table.component.css']
})

export class ClassListTableComponent implements OnInit {


  listOfColumns: ColumnItem[] = [
    {
      name: 'Class Id',
      sortOrder: 'descend',
      sortFn: (a: ClassVoModel, b: ClassVoModel) => a.classId - b.classId,
      width: "10vh",
    },
    {
      name: 'Class Name',
      sortOrder: null,
      sortFn: (a: ClassVoModel, b: ClassVoModel) => a.className.localeCompare(b.className),
      filterMultiple: true,
      filterFn: (list: string[], item: StudentVoModel) => list.some(name => item.fullName.indexOf(name) !== -1),
      width: "16vh",

    },
    {
      name: 'Date Created',
      sortOrder: null,
      sortFn: (a: ClassVoModel, b: ClassVoModel) => {
        return (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
      },
      width: "15vh",
    },
    {
      name: 'Students',
    },
    {
      name: 'Teachers',

    },
    {
      name: 'Action',
      width: "7vh",
    },
  ];

  allClasses: ClassVoModel[];
  allClassesDisplay: ClassVoModel[];
  allStudents: StudentVoModel[];
  allStaffs: any[];
  tableLoading: boolean;
  subscription: Subscription;

  searchVisible: boolean = false;
  searchValue = '';

  constructor(private classService: ClassService, private studentService: StudentService, private staffService: StaffService, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.updateClassData();
    this.subscription = this.classService.getCreateClassEvent().subscribe(res => {
      if (res) {
        this.updateClassData();
      }
    })
  }

  updateClassData() {
    this.searchValue = '';
    this.tableLoading = true;

    let allStudents = this.studentService.showAllStudents();
    let allStaffs = this.staffService.showAllStaffs();
    let allClasses = this.classService.showAllClasses();
    forkJoin([allStudents, allStaffs, allClasses]).subscribe(results => {
      this.allStudents = results[0];
      this.allStaffs = results[1];
      this.allClasses = results[2];

      this.allClasses.forEach(eachClass => {
        let studentInClass = eachClass.students.map(student => {
          return student.studentId;
        });
        let teacherInClass = eachClass.teachers.map(teacher => {
          return teacher.staffId;
        });
        let studentsOption: Array<{ value: number; label: string }> = [];
        if (this.allStudents) {
          let studentFilterOption = this.allStudents.filter(student => {
            return student.class?.classId == eachClass.classId || student.class == null || student.class.length == 0
          })
          studentsOption = studentFilterOption.map(student => {
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

        eachClass['showEditStudentColumn'] = false;
        eachClass['studentsInClass'] = studentInClass;
        eachClass['studentsOption'] = studentsOption;

        eachClass['showEditTeacherColumn'] = false;
        eachClass['teachersInClass'] = teacherInClass;
        eachClass['teachersOption'] = teachersOption;

      });
      this.allClassesDisplay = [...this.allClasses];
      this.tableLoading = false;

    });

  }

  updateStudents(thisClass: ClassVoModel) {
    const payload = {
      classId: thisClass.classId,
      studentIdList: thisClass['studentsInClass']
    }
    this.classService.updateStudents(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Students updated in class ${thisClass.className}`)
        }
      }, error => {
        this.msg.error(`Failed please try again`)
      }
    )
  }

  updateTeachers(thisClass: ClassVoModel) {
    const payload = {
      classId: thisClass.classId,
      teacherIdList: thisClass['teachersInClass']
    }
    this.classService.updateTeachers(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Teachers updated in class ${thisClass.className}`)
        }
      }, error => {
        this.msg.error(`Failed please try again`)
      }
    )
  }

  idMapName(id: number, mapArray: any[]) {
    if (this.allClasses) {
      const selected = mapArray.find(object => {
        return object['value'] == id
      })
      return selected['label'];
    }
  }

  deleteClass({classId, className}) {
    if (!classId) return;
    this.classService.deleteClass({classId: classId}).subscribe(res => {
      if (res) {
        this.updateClassData();
        this.msg.success(`Class ${className} deleted`)
      }
    }, error => {
      this.msg.error(`Failed please try again`)
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    this.allClassesDisplay = this.allClasses.filter((thisClass) => thisClass.className.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) !== -1);
  }
}
