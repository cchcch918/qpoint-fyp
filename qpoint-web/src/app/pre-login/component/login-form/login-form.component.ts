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
  validateForm: FormGroup;


  constructor(private fb: FormBuilder, private preLoginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let staffLoginVo = {
      username: this.validateForm.controls['username'].value,
      password: this.validateForm.controls['password'].value
    };
    this.preLoginService.staffLogin(staffLoginVo).subscribe(
      (res) => {
        this.preLoginService.token = res.token;
        this.router.navigate(['/test']);
        console.log('Bearer ' + this.preLoginService.token)
      },
      (error) => {
        throw error
      }
    )
  }

}
