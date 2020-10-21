import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../core/service/login.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginLoading: boolean;


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.loginLoading = true

    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    let staffLoginVo = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.loginService.adminLogin(staffLoginVo).subscribe(
      (res) => {
        this.loginService.token = res.token;
        this.router.navigate(['/student/student-qrcode-list']);
        this.loginLoading = false
      },
      (error) => {
        if (error) {
          this.msg.error(error.error.errorMessage + ' Please try again later. ');
          this.loginLoading = false

        }
      }
    )
  }

  registerStaff() {
    this.router.navigate(['/pre-login/register-admin']);
  }

  forgetPassword() {
    this.router.navigate(['/pre-login/forget-password']);
  }
}
