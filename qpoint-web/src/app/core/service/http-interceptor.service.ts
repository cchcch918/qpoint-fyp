import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    const token = this.loginService.token;
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = 'Bearer ' + token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest).toPromise();
  }

}
