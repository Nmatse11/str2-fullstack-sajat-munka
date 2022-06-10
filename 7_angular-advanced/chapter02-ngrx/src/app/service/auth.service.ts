import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Bejelentkezési url
  loginUrl = `${this.config.apiUrl}login`;
  // Kijelentkezési url
  logoutUrl = `${this.config.apiUrl}logout`;

  // currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  // user azonosítására szolgáló token
  lastToken: string | null = null

  // jelenlegi User elmentése egy változóba
  storageName = 'currentUser'

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  // kiolvassa az aktuális User értékét
  get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  // bejelentkezés
  login(loginData: User): Observable<{ accessToken: string} | User | User[] | null> {
    // http-kérés küldése a servernek, aki az autentikációt végzi
    return this.http.post<{accessToken: string}>(
      this.loginUrl,
      {
        email: loginData.email,
        password: loginData.password
      }
    )
    // ki kell szedni belőle a User-t
    .pipe( switchMap( response => {
      // ha válaszban van accessToken, akkor sikerült a belépés
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return this.userService.query(`email=${loginData.email}`);
      }
      // ha nem sikerült belépni
      return of(null);
    }))
    .pipe(
      // tap operátor, ami nem módosít az adatokon
      tap( user => {
        // ha nincs user
        if (!user) {
          localStorage.removeItem(this.storageName);
          // null-t adunk tovább
          this.currentUserSubject.next(null);
        } else {
          // ha van user, akkor a querytömb nulladik eleme a user
          // ezzel a felhasználóval dolgozunk tovább
          if (Array.isArray(user))  user = user[0]
          user.token = this.lastToken || undefined;
          // localStorage-be lementése az user-t szöveggé alakítva
          localStorage.setItem(this.storageName, JSON.stringify(user));
          // továbbdobjuk az új felhasználói adat
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  // kijelentkezés
  logout() {
    // localStorage-ből törtli a User-t
    localStorage.removeItem(this.storageName);
    // visszaállítja nullre az értékét
    this.currentUserSubject.next(null)
    // visszairányít a login oldral
    this.router.navigate(['login'])
  }
}
