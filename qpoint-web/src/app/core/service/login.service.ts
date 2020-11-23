import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {StaffVoModel} from "../../staff/model/staff-vo.model";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router, private msg: NzMessageService) {
  }

  get token(): string {
    return localStorage.getItem('login_token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('login_token', val);
    } else {
      localStorage.clear();
    }
  }

  showAllStaffs(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/staff/api/staffs', this.httpOptions)
  }

  getAdminAccountDetails(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/get-admin-account-details', payload, this.httpOptions)
  }

  adminRegister(staffDetails: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/auth/register', staffDetails, this.httpOptions)
  }

  adminLogin(staffDetails: any): Observable<StaffVoModel> {
    return this.http.post<any>(this.baseUrl + '/staff/admin-login', staffDetails, this.httpOptions);
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/auth/change-password', payload, this.httpOptions);
  }

  adminLogout() {
    localStorage.removeItem('login_token');
    this.token = null;
    this.router.navigate(['/pre-login']);
    this.msg.success("Logout successful")
  }

  checkStaffExists(staffUsername: string) {
    return this.http.get<any>(this.baseUrl + '/staff/api/check-staff-exists/' + staffUsername, this.httpOptions);
  }

  sendForgetPasswordEmail(payload: any) {
    return this.http.post<any>(this.baseUrl + '/staff/auth/admin/send-forget-password-email', payload, this.httpOptions);
  }

  verifyPasswordResetToken(payload: any) {
    return this.http.post<any>(this.baseUrl + '/staff/auth/admin/verify-password-reset-token', payload, this.httpOptions);
  }

}
