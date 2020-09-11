import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private subject = new Subject<any>();

  constructor(public http: HttpClient, public router: Router) {
  }

  showAllGroups(): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + '/group/show-all-groups', [], this.httpOptions);
  }

  createNewGroup(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/group/create-new-group', payload, this.httpOptions);
  }

  sendCreateGroupEvent() {
    this.subject.next(true);
  }

  getCreateGroupEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  updateStudents(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/group/update-students', payload, this.httpOptions);
  }

  updateTeacher(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/group/update-teacher', payload, this.httpOptions);
  }

  deleteGroup(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/group/delete-group', payload, this.httpOptions);
  }

  getStudentRankingByGroup(payload): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + '/student-behaviour-record/get-student-ranking-by-group', payload, this.httpOptions);
  }

  getStudentBehaviouralRecordsByGroup(payload): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + '/student-behaviour-record/get-student-behaviour-records-by-group', payload, this.httpOptions);
  }


}
