import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd";
import {StudentService} from "../../service/student.service";
import {StudentVoModel} from "../../model/student-vo.model";


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
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.css']
})
export class StudentListTableComponent implements OnInit, OnChanges {
  @Input() update: boolean;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Student Id',
      sortOrder: 'descend',
      sortFn: (a: StudentVoModel, b: StudentVoModel) => a.studentId - b.studentId,
      width: "10vh",
    },
    {
      name: 'Student Name',
      sortOrder: null,
      sortFn: (a: StudentVoModel, b: StudentVoModel) => a.fullName.localeCompare(b.fullName),
      filterMultiple: true,
      filterFn: (list: string[], item: StudentVoModel) => list.some(name => item.fullName.indexOf(name) !== -1),
      width: "15vh",

    },
    {
      name: 'Date Created',
      sortOrder: null,
      sortFn: (a: StudentVoModel, b: StudentVoModel) => {
        return (new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
      },
      width: "15vh",
    },
    {
      name: 'Parent Email',
      sortOrder: null,
    },
    {
      name: 'Class',
      sortOrder: null,
    },
    {
      name: 'Group',
      sortOrder: null,
    },
  ];

  students: StudentVoModel[];


  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update) {
      this.studentService.showAllStudents().subscribe(res => {
        this.students = res;
      })
    }
  }


}
