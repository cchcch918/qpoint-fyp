import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StaffService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private subject = new Subject<any>();

  constructor(public http: HttpClient, public router: Router) {
  }

  showAllStaffs(): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + '/staff/show-all-staffs', [], this.httpOptions);
  }

  createNewStaff(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/staff-register', payload, this.httpOptions);
  }

  sendCreateStaffEvent() {
    this.subject.next(true);
  }

  getCreateStaffEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  deleteStaff(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staff/delete-staff', payload, this.httpOptions);
  }

}
