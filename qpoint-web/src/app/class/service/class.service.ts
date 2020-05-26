import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ClassService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router) {
  }

  showAllClasses(): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + '/class/show-all-classes', [], this.httpOptions);
  }

  createNewClass(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/class/create-new-class', payload, this.httpOptions);
  }

  updateStudents(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/class/update-students', payload, this.httpOptions);
  }

  updateTeachers(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/class/update-teachers', payload, this.httpOptions);
  }


}
