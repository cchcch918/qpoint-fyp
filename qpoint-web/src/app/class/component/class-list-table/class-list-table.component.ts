import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClassService} from "../../service/class.service";
import {StudentVoModel} from "../../../student/model/student-vo.model";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {ClassVoModel} from "../../model/class-vo.model";

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
      width: "15vh",

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
      sortOrder: null,
    },
    {
      name: 'Teachers',
      sortOrder: null,
    },
  ];

  classes: any[];

  constructor(private classService: ClassService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update) {
      this.updateClassData();
    }
  }

  showStudentsName(students: StudentVoModel[]) {
    if (students.length == 0) return "-"
    let studentsList = ""
    students.forEach(student => {
      studentsList = studentsList + `${student.fullName}, `;
    })
    return studentsList.slice(0, -2);
  }

  showTeachersName(teachers: any[]) {
    if (teachers.length == 0) return "-"
    let teachersList = ""
    teachers.forEach(teacher => {
      teachersList = teachersList + `${teacher.username}, `;
    })
    return teachersList.slice(0, -2);
  }

  updateClassData() {
    this.classService.showAllClasses().subscribe(res => {
      this.classes = res;
    })
  }
}
