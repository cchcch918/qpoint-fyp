import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {CreateStudentVoModel} from "../../model/create-student-vo.model";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-student-form',
  templateUrl: './create-student-form.component.html',
  styleUrls: ['./create-student-form.component.css']
})
export class CreateStudentFormComponent implements OnInit {
  @Output() updateTableEvent: EventEmitter<any> = new EventEmitter();

  createStudentForm: FormGroup;
  createStudentLoading: boolean = false;

  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private fb: FormBuilder, private studentService: StudentService, private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createStudentForm = this.fb.group({
      fullName: [null, [Validators.required]],
      parentEmail: [null, [Validators.email, Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.createStudentForm.controls) {
      this.createStudentForm.controls[i].markAsDirty();
      this.createStudentForm.controls[i].updateValueAndValidity();
    }

    let createStudentVo: CreateStudentVoModel = {
      fullName: this.createStudentForm.controls['fullName'].value,
      parentEmail: this.createStudentForm.controls['parentEmail'].value,
    };

    this.createStudentLoading = true;
    this.studentService.createNewStudent(createStudentVo).subscribe(res => {
        if (res) {
          this.createStudentLoading = false;
          this.msg.success('Student has been created');
          this.createStudentForm.reset();
          this.updateTableEvent.emit(true);

        }

      },
      (error) => {
        this.createStudentLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      }
    )
  }

  beforeUpload = (file: UploadFile) => {
    return new Observable((observer: Observer<boolean>) => {
      console.log('file', file)
      const isCsv = file.type === 'application/vnd.ms-excel';
      if (!isCsv) {
        this.msg.error('You can only upload .CSV file!');
        observer.complete();
        return;
      }
      this.fileList = this.fileList.concat(file);
      observer.next(!isCsv);
      observer.complete();
    });
  };

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('csvFile', file);
    });
    this.uploading = true;
    this.studentService.createNewStudentsFromExcel(formData).subscribe(res => {
      if (res) {
        this.uploading = false;
        this.fileList = [];
        this.msg.success('Students create successfully.');
        this.updateTableEvent.emit(true);
      }
    }, () => {
      this.uploading = false;
      this.msg.error('Students create failed. Please try again later.');
    })


  }

}
