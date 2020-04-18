import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../core/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    let staffLoginVo = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.loginService.staffLogin(staffLoginVo).subscribe(
      (res) => {
        this.loginService.token = res.token;
        this.router.navigate(['/test']);
        console.log('Bearer ' + this.loginService.token)
      },
      (error) => {
        throw error
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
