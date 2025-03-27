import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes("/auth/login")) {
      let newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      })
      return next.handle(newRequest);
    }

    return next.handle(req);

  }

}
