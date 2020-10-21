import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {NotificationVoModel} from "../model/notification-vo-model";

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private createSubject = new Subject<any>();
  private editSubject = new Subject<any>();

  constructor(public http: HttpClient) {
  }

  sendOpenEditNotificationModalEvent(notification: NotificationVoModel) {
    this.editSubject.next(notification);
  }

  getOpenEditNotificationModalEvent(): Observable<any> {
    return this.editSubject.asObservable();
  }

  showAllNotifications(): Observable<NotificationVoModel[]> {
    return this.http.post<NotificationVoModel[]>(this.baseUrl + '/notification/show-all-notifications', [], this.httpOptions);
  }

  createNotification(payload): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/notification/create-notification', payload, this.httpOptions);
  }

  sendCreateNotificationEvent() {
    this.createSubject.next(true);
  }

  getCreateNotificationEvent(): Observable<any> {
    return this.createSubject.asObservable();
  }


}
