import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import {StaffService} from "../../service/staff.service";

@Component({
  selector: 'app-create-staff-form',
  templateUrl: './create-staff-form.component.html',
  styleUrls: ['./create-staff-form.component.css']
})
export class CreateStaffFormComponent implements OnInit {

  createStaffForm: FormGroup;
  createStaffLoading: boolean;

  constructor(private fb: FormBuilder, private staffService: StaffService, private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.createStaffForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.createStaffLoading = true;
    let payload = {
      username: this.createStaffForm.controls['username'].value,
      email: this.createStaffForm.controls['email'].value,
    }
    this.staffService.createNewStaff(payload).subscribe(res => {
        if (res) {
          this.createStaffLoading = false;
          this.createStaffForm.reset();
          this.msg.success(`Staff ${payload.username} created`);
          this.staffService.sendCreateStaffEvent();
        }
      },
      error => {
        this.createStaffLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }


}
