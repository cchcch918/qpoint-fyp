import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginStaffVoModel} from "../../pre-login/model/login-staff-vo.model";
import {environment} from "../../../environments/environment";

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

  constructor(private http: HttpClient) {
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
    return this.http.get<any>(this.baseUrl + '/api/staffs', this.httpOptions)

  }

  staffRegister(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/register', this.httpOptions)
  }

  staffLogin(staffLoginVo: any): Observable<LoginStaffVoModel> {
    console.log(staffLoginVo);
    return this.http.post<any>(this.baseUrl + '/auth/login', staffLoginVo, this.httpOptions);
  }

}
