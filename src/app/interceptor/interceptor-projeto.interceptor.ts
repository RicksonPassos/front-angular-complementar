import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorProjetoInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info("interceptor");

    const token = localStorage.getItem('token');
    if (token !== '' && token !== null) {
      console.info("token: " + token);

      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq);

    } else {
      return next.handle(request);
    }

  }
}
