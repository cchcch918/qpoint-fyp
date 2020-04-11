import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  testApi(): Observable<any> {
    return this.http.get<any>(environment.apiUrl, this.httpOptions)
  }

}
