import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClassService} from "../../service/class.service";
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {NzMessageService, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {ClassVoModel} from "../../model/class-vo.model";
import {StudentService} from "../../../student/service/student.service";
import {StaffService} from "../../../staff/service/staff.service";

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

export class ClassListTableComponent implements OnInit, OnChanges {

  @Input() update: boolean;

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
      width: "10vh",

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
  allStudents: StudentVoModel[];
  allStaffs: any[];
  tableLoading: boolean;

  constructor(private classService: ClassService, private studentService: StudentService, private staffService: StaffService, private msg: NzMessageService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update) {
      this.updateClassData();
    }
  }

  updateClassData() {
    this.tableLoading = true;
    this.studentService.showAllStudents().subscribe(res => {
      this.allStudents = res
      this.staffService.showAllStaffs().subscribe(res => {
        this.allStaffs = res
        this.classService.showAllClasses().subscribe(res => {
          this.allClasses = res;
          this.allClasses.forEach(eachClass => {
            let studentInClass = eachClass.students.map(student => {
              return student.studentId;
            });
            let teacherInClass = eachClass.teachers.map(teacher => {
              return teacher.staffId;
            });
            let studentFilterOption;
            let studentsOption: Array<{ value: number; label: string }> = [];
            if (this.allStudents) {
              studentFilterOption = this.allStudents.filter(student => {
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
            eachClass['showEditStudentsColumn'] = false;
            eachClass['studentsInClass'] = studentInClass;
            eachClass['studentsOption'] = studentsOption;

            eachClass['showEditTeachersColumn'] = false;
            eachClass['teachersInClass'] = teacherInClass;
            eachClass['teachersOption'] = teachersOption;
          })
          this.tableLoading = false;

        })
      })
    })

  }

  updateStudents(thisClass: ClassVoModel) {
    const payload = {
      classId: thisClass.classId,
      studentIdList: thisClass['studentsInClass']
    }
    this.classService.updateStudents(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Students updated in class ${thisClass.className}`)
          this.updateClassData()
        }
      }, error => {
        this.msg.error(`Failed please try again`)
      }
    )
  }

  updateTeachers(teacher: any) {
    const payload = {
      classId: teacher.classId,
      teacherIdList: teacher['teachersInClass']
    }
    this.classService.updateTeachers(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Teachers updated in class ${teacher.className}`)
          this.updateClassData()
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
}

