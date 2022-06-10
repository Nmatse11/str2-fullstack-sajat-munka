import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  serverError = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // FormsModul beállítás után
  onLogin(ngForm: NgForm): void {
    // visszaalakítása Promise-vé
    this.auth.login(ngForm.value).toPromise().then(
    // a login metódus végétől folytatjuk, amikor leellenőrizte az adatokat, minden rendben volt és tovább adta a user adatokat
          userResponse => {
            // ha a currentUser nem null
            if (this.auth.currentUserValue) {
              // továbbnavigáljuk a főoldalra
              this.router.navigate(['/']);
            }
          },
          // ha nem sikerült belépni
          err => {
            this.serverError = err.error;
            // setTimeout azért kell, hogy a serverError ne maradjon kint az oldalon a végtelenségig
            const to = setTimeout( () => {
            clearTimeout(to);
              // serverError újra üres
              this.serverError = '';
              }, 3000);
            }
    );
  }

}
