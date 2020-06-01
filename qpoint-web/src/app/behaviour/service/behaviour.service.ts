import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BehaviourVoModel} from "../model/behaviour-vo-model";

@Injectable({
  providedIn: 'root'
})

export class BehaviourService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {
  }

  showAllBehaviours(): Observable<BehaviourVoModel[]> {
    return this.http.post<BehaviourVoModel[]>(this.baseUrl + '/behaviour/show-all-behaviours', [], this.httpOptions);
  }

  createNewBehaviour(payload: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + '/behaviour/create-new-behaviour', payload, this.httpOptions);
  }

  deleteBehaviour(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/behaviour/delete-behaviour', payload, this.httpOptions);
  }

  updateBehaviour(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/behaviour/update-behaviour', payload, this.httpOptions);
  }

}
