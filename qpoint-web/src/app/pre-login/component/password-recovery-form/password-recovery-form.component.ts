import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../core/service/login.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.css']
})
export class PasswordRecoveryFormComponent implements OnInit {

  passwordRecoveryForm: FormGroup;
  username: string;
  MIN_PASSWORD_LENGTH = 6;
  tokenVerified = undefined;
  template: string;
  errorMessage: string;


  constructor(private route: ActivatedRoute, private loginService: LoginService, private fb: FormBuilder, private router: Router, private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');

      let payload = {
        username: params.get('username'),
        token: params.get('resetPasswordToken')
      };
      this.loginService.verifyPasswordResetToken(payload).subscribe(res => {
          this.tokenVerified = true;
          res.result ? this.template = "passwordRecoveryFormTemplate" : this.template = "forbiddenTemplate";

        },
        error => {
          this.tokenVerified = true;
          this.template = "forbiddenTemplate";
          this.errorMessage = error.error.errorMessage;
        }
      )
    });

    this.passwordRecoveryForm = this.fb.group({
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator, Validators.min(6)]],
    });
  }

  updateConfirmValidator() {
    Promise.resolve().then(() => this.passwordRecoveryForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.passwordRecoveryForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };


  submitPasswordRecoveryForm() {
    for (const i in this.passwordRecoveryForm.controls) {
      this.passwordRecoveryForm.controls[i].markAsDirty();
      this.passwordRecoveryForm.controls[i].updateValueAndValidity();
    }
    let payload = {
      username: this.username,
      password: this.passwordRecoveryForm.controls['password'].value
    };
    this.loginService.changePassword(payload).subscribe(res => {
        if (res) {
          const modal: NzModalRef = this.modalService.create({
            nzTitle: 'Success',
            nzContent: 'Staff password has been changed',
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
        } else {
          const modal: NzModalRef = this.modalService.create({
            nzTitle: 'Failed',
            nzContent: "Please try again later",
            nzClosable: false,
            nzFooter: [
              {
                label: 'Try again',
                shape: null,
                onClick: () => {
                  modal.destroy();
                }
              }],
          })
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
      })
  }

  backLoginPage() {
    this.router.navigate(['/pre-login']);
  }
}
