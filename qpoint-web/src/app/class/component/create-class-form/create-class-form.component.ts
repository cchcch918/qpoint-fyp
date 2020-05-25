import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, UploadFile} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {ClassService} from "../../service/class.service";
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-class-form',
  templateUrl: './create-class-form.component.html',
  styleUrls: ['./create-class-form.component.css']
})
export class CreateClassFormComponent implements OnInit {
  @Input() adminId: number;
  @Output() updateTableEvent: EventEmitter<any> = new EventEmitter();

  createClassForm: FormGroup;
  createClassLoading: boolean;
  fileList: UploadFile[] = [];
  uploading: boolean;


  constructor(private fb: FormBuilder, private classService: ClassService, private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.createClassForm = this.fb.group({
      className: [null, [Validators.required]],
    });
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

  submitForm() {
    this.createClassLoading = true;
    let payload = {
      className: this.createClassForm.controls['className'].value,
      createdByAdminId: this.adminId
    }
    this.classService.createNewClass(payload).subscribe(res => {
        this.createClassLoading = false;
        this.createClassForm.reset();
        this.msg.success(`Class ${payload.className} created`);
        this.updateTableEvent.emit(true);
      },
      error => {
        this.createClassLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }

  handleUpload() {

  }
}
