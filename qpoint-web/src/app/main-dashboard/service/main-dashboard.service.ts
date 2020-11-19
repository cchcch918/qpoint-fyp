import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MainDashboardService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // private subject = new Subject<any>();

  constructor(public http: HttpClient, public router: Router) {
  }

  getOverallStudentBehaviourRecords(): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + '/student-behaviour-record/get-overall-student-behaviour-records', [], this.httpOptions);
  }

  getOverallRanking(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student-behaviour-record/get-overall-ranking', [], this.httpOptions);
  }

  getTodayRecordDetails(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student-behaviour-record/get-today-record-details', [], this.httpOptions);
  }

}
