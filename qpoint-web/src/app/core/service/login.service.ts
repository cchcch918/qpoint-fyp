import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginStaffVoModel} from "../../pre-login/model/login-staff-vo.model";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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

  constructor(public http: HttpClient, public router: Router) {
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

  staffRegister(staffDetails: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/auth/register', staffDetails, this.httpOptions)
  }

  staffLogin(staffDetails: any): Observable<LoginStaffVoModel> {
    return this.http.post<any>(this.baseUrl + '/staff/auth/login', staffDetails, this.httpOptions);
  }

  changePassword(payload: any): Observable<any> {
    console.log("payload1", payload)
    return this.http.post<any>(this.baseUrl + '/staff/auth/change-password', payload, this.httpOptions);
  }

  staffLogout() {
    localStorage.removeItem('login_token');
    this.token = null;
    this.router.navigate(['/pre-login']);
  }

  checkStaffExists(staffUsername: string) {
    console.log('servioce')
    return this.http.get<any>(this.baseUrl + '/staff/api/check-staff-exists/' + staffUsername, this.httpOptions);
  }

  sendForgetPasswordEmail(payload: any) {
    return this.http.post<any>(this.baseUrl + '/staff/auth/admin/send-forget-password-email', payload, this.httpOptions);
  }

  verifyPasswordResetToken(payload: any) {
    return this.http.post<any>(this.baseUrl + '/staff/auth/admin/verify-password-reset-token', payload, this.httpOptions);
  }

}
