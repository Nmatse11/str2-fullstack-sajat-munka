import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    // ez a servic tárolja a tokent
    private auth: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // az aktuális user lekérése
    // const currentUser = this.auth.currentUserValue;

    // a user adatait csak a token birtokban lehet elérni
    const currentToken = this.auth.lastToken;

    //if (currentUser && currentUser.token) {
    if (currentToken) {
      // http-kérés klónozása
      request = request.clone({
        setHeaders: {
          // beállítja a token a Headers-be
          //Authorization: `Bearer ${currentUser.token}`
          Authorization: `Bearer ${currentToken}`
        }
      });
    }
    // ha nincs token, akkor a kapott request megy tovább
    // ha van token, akkor a request-et felülírjuk a klónjáva és a fejlécébe beállítjuk az aktuális tokent az autorizációhoz
    return next.handle(request);
  }

}
