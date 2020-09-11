import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {StudentQrVoModel} from "../model/student-qr-vo.model";
import {CreateStudentVoModel} from "../model/create-student-vo.model";
import {StudentVoModel} from "../model/student-vo.model";

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

  showAllStudentsQrCode(): Observable<StudentQrVoModel[]> {
    return this.http.post<StudentQrVoModel[]>(this.baseUrl + '/student/show-all-students-qrcode', [], this.httpOptions);
  }

  showAllStudents(): Observable<StudentVoModel[]> {
    return this.http.post<StudentVoModel[]>(this.baseUrl + '/student/show-all-students', [], this.httpOptions);
  }

  createNewStudent(payload: CreateStudentVoModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student/create-new-student', payload, this.httpOptions);
  }

  deleteStudent(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student/delete-student', payload, this.httpOptions);
  }

  createNewStudentsFromExcel(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student/create-new-students-from-excel', payload, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
      })
    });
  }

  uploadStudentProfileImage(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/student/upload-student-profile-image', formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
      })
    });
  }

  getStudentProfileImage(fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/get-student-profile-image/${fileName}`, {responseType: "blob"});
  }


}
