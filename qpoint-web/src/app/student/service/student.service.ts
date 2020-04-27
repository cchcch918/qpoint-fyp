import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {StudentQrModel} from "../model/studentQr.model";

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router) {
  }

  showAllStudentsQrCode(): Observable<StudentQrModel[]> {
    return this.http.post<StudentQrModel[]>(this.baseUrl + '/user/show-all-students-qrcode', this.httpOptions)
  }

}
