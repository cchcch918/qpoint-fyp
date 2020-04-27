import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../core/service/login.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  MIN_USERNAME_LENGTH = 6;
  MIN_PASSWORD_LENGTH = 6;

  constructor(private fb: FormBuilder, private loginService: LoginService, private modalService: NzModalService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required, Validators.min(this.MIN_USERNAME_LENGTH)]],
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator, Validators.min(6)]],
      email: [null, [Validators.email, Validators.required]],
      agree: [null, [Validators.requiredTrue]],
    }, {
      validator: this.usernameValidator('username')
    });
  }

  updateConfirmValidator() {
    Promise.resolve().then(() => this.registerForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.registerForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  usernameValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      control.valueChanges.pipe(take(1)).subscribe(res => {
        if (!res) {
          control.setErrors({required: true});
        } else if (res.length >= this.MIN_USERNAME_LENGTH) {
          this.loginService.checkStaffExists(control.value).pipe(take(1)).subscribe(res => {
              if (!res.result) {
                control.setErrors(null);

              } else {
                control.setErrors({confirm: true});
              }
            },
            () => {
              control.setErrors({confirm: true});
            }
          );
        }
      });

    }
  }

  submitForm() {

    let staffDetails = {
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value,
      email: this.registerForm.controls['email'].value,
    };

    this.loginService.staffRegister(staffDetails).subscribe(
      res => {
        if (res) {
          const modal: NzModalRef = this.modalService.create({
            nzTitle: 'Success',
            nzContent: 'Staff has been registered',
            nzClosable: false,
            nzFooter: [
              {
                label: 'Back to login page',
                shape: null,
                onClick: () => {
                  this.router.navigate(['/pre-login']);
                  modal.destroy();
                }
              }],
          });
        }
      },
      (error) => {
        const modal: NzModalRef = this.modalService.create({
          nzTitle: 'Failed',
          nzContent: error.error.errorMessage,
          nzClosable: false,
          nzFooter: [
            {
              label: 'Try again',
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
