import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface IAuthModel {
  success: boolean;
  accessToken: string;
  user: User,
}

export interface ILoginData {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;

  loginUrl: string = '';

  // az alkalmazás többi része fel tud iratkozni rá és adatokat tud kinyerni belőle
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  access_token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginUrl = `${this.apiUrl}login`;

    // indításkor megnézzük, hogy van egy a sessionStorage-be adat
    // így már megy az interceptoros megoldás is
    const loginInfo = sessionStorage.getItem('login');
    if (loginInfo) {
      const loginObject = JSON.parse(loginInfo);
      // kiszedjük belőle az adatokat
      this.access_token$.next(loginObject.accessToken);
      this.user$.next(loginObject.user);
    }

    // ha változik a user, akkor ez lefut
    this.user$.subscribe({
      // next: {} - az első függvény
      next: user => {
        if (user) {
          // főoldalra irányít
          this.router.navigate(['/']);
        } else {
          // átirányítás a login oldalra
          this.router.navigate(['/', 'login']);
          // access_token is törlődik
          this.access_token$.next('');
          // sessionStorage kiürítése
          sessionStorage.removeItem('login');
        }
      }
    });

  }

  login(loginData: ILoginData): void {
    // post metódust küld
    this.http.post<IAuthModel>(this.loginUrl, loginData).subscribe({
      // ha sikeres volt a belépés, akkor visszaküldi a login.router.js-ben tovább küldött adatokat
      next: (response: IAuthModel) => {
        //console.log(response)
        //a bejelentkezési adatok eltárolása (login.router.js-ből jövő adatok)
        this.user$.next(response.user);
        this.access_token$.next(response.accessToken);
        // válasz eltárolása a böngésző ideiglenes tárjaba
        // ez addig őrzi meg, amíg be nem zárjuk az böngészőt
        sessionStorage.setItem('login', JSON.stringify(response));
      },
      error: (err) => console.error(err),
    });
  }

  logout(): void {
    // user kinullázása
    this.user$.next(null);
  }

}
