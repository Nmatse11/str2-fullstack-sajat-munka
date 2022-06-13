import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // az access_token aktuális értékének lementése
    const accessToken = this.auth.access_token$.getValue();
    if (accessToken) {
      // a kérés klónozása
      const newRequest = request.clone({
        // headers beállítása
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });

      // kiküldi az újkérést
      return next.handle(newRequest);
    }

    // ga nincs acces_token, akkor küldi tovább az eredetit
    return next.handle(request);
  }
}
