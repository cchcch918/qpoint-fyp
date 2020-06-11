import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {ClassService} from "../../service/class.service";

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


  constructor(private fb: FormBuilder, private classService: ClassService, private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.createClassForm = this.fb.group({
      className: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.createClassLoading = true;
    let payload = {
      className: this.createClassForm.controls['className'].value,
      createdByAdminId: this.adminId
    }
    this.classService.createNewClass(payload).subscribe(res => {
        if (res) {
          this.createClassLoading = false;
          this.createClassForm.reset();
          this.msg.success(`Class ${payload.className} created`);
          this.updateTableEvent.emit(true);
        }
      },
      error => {
        this.createClassLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }

}
