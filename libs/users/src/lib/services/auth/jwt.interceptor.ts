import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private localstorageService: LocalstorageService,
  ) {}

  // load over the http requests a headers to the http requests with the token
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageService.getToken();
    const isAPIUrl = request.url.startsWith(environment.apiURL);

    if (token && isAPIUrl) {
      // Add headers to the request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    
    return next.handle(request);
  }
}
