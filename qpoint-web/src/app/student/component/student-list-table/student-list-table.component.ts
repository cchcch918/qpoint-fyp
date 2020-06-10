import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  NzMessageService,
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
  UploadFile
} from "ng-zorro-antd";
import {StudentService} from "../../service/student.service";
import {StudentVoModel} from "../../model/student-vo.model";
import {Observable, Observer} from "rxjs";


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
    {
      name: 'Action',
      sortOrder: null,
    },
  ];

  students: StudentVoModel[];
  fileList: UploadFile[] = [];
  isModalVisible: boolean;
  uploadLoading: boolean
  selectedStudent: StudentVoModel;
  tableLoading: boolean;

  constructor(private studentService: StudentService, private msg: NzMessageService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update) {
      this.updateTable()
    }
  }

  updateTable() {
    this.tableLoading = true;
    this.studentService.showAllStudents().subscribe(res => {
      if (res) {
        this.students = res;
        this.tableLoading = false;
      }
    })
  }


  beforeUpload = (file: UploadFile) => {
    return new Observable((observer: Observer<boolean>) => {
      console.log("file", file)
      const isImage = (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
      if (!isImage) {
        this.msg.error('You can only upload an image!');
        observer.complete();
        return;
      }
      this.fileList = this.fileList.concat(file);
      observer.next(!isImage);
      observer.complete();
    });
  };

  handleCancel() {
    this.isModalVisible = false
    this.fileList = [];
    this.selectedStudent = null;
  }

  handleOk() {

    this.uploadLoading = true
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      // const payload ={
      //   studentId: this.selectedStudent.studentId
      // }
      formData.append('student', JSON.stringify(this.selectedStudent));
      formData.append('image', file);

    });

    this.studentService.uploadStudentProfileImage(formData).subscribe(res => {
      if (res) {
        this.fileList = [];
        this.uploadLoading = false;
        this.msg.success("Successfully update student profile picture !")
        this.updateTable()
        this.handleCancel();
      }
    }, err => {
      if (err) {
        this.msg.error("Please try again later");
        this.uploadLoading = false;
      }
    })
  }

  openUpdateModal(selectedStudent: StudentVoModel) {
    this.isModalVisible = true
    this.selectedStudent = selectedStudent;
  }
}


