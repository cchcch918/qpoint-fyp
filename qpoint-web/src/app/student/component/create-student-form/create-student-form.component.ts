import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {CreateStudentVoModel} from "../../model/create-student-vo.model";
import {NzModalRef, NzModalService} from "ng-zorro-antd";


@Component({
  selector: 'app-create-student-form',
  templateUrl: './create-student-form.component.html',
  styleUrls: ['./create-student-form.component.css']
})
export class CreateStudentFormComponent implements OnInit {
  createStudentForm: FormGroup;
  createStudentLoading: boolean = false;

  constructor(private fb: FormBuilder, private studentService: StudentService, private modalService: NzModalService) {
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
          const modal: NzModalRef = this.modalService.create({
            nzTitle: 'Success',
            nzContent: 'Student has been created',
            nzClosable: false,
            nzFooter: [
              {
                label: 'Close',
                shape: null,
                onClick: () => {
                  modal.destroy();
                }
              }],
          });
        }

      },
      (error) => {
        this.createStudentLoading = false;
        const modal: NzModalRef = this.modalService.create({
          nzTitle: 'Failed',
          nzContent: error.error.message,
          nzClosable: false,
          nzFooter: [
            {
              label: 'Try again later',
              shape: null,
              onClick: () => {
                modal.destroy();
              }
            }],
        });
      }
    )
  }
}
