import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/service/login.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password-verification',
  templateUrl: './forget-password-verification.component.html',
  styleUrls: ['./forget-password-verification.component.css']
})
export class ForgetPasswordVerificationComponent implements OnInit {

  showSendEmailTemplate: boolean;
  username: string;
  sendRecoveryEmailLoading: boolean = false;

  constructor(private loginService: LoginService, private nzModalService: NzModalService, private router: Router) {
  }

  ngOnInit(): void {
  }

  verifyUsername() {
    this.loginService.checkStaffExists(this.username).subscribe(res => {
        if (res.result) {
          this.showSendEmailTemplate = true;
        } else {
          const modal: NzModalRef = this.nzModalService.create({
            nzTitle: 'Failed',
            nzContent: "The username does not exists",
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
          this.showSendEmailTemplate = false;

        }
      },
      () => {
        const modal: NzModalRef = this.nzModalService.create({
          nzTitle: 'Failed',
          nzContent: "An error occurs.",
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
        this.showSendEmailTemplate = false;

      })

  }

  sendRecoveryEmail() {
    this.sendRecoveryEmailLoading = true;
    let payload = {
      username: this.username
    }
    this.loginService.sendForgetPasswordEmail(payload).subscribe(res => {
        if (res) {
          const modal: NzModalRef = this.nzModalService.create({
            nzTitle: 'Success',
            nzContent: 'An verification email has sent to ' + res.censoredEmail,
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
      error => {
        const modal: NzModalRef = this.nzModalService.create({
          nzTitle: 'Failed',
          nzContent: error.error.message,
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
        this.sendRecoveryEmailLoading = false;
      }, () => {
        this.sendRecoveryEmailLoading = false;
      }
    );
  }
}
