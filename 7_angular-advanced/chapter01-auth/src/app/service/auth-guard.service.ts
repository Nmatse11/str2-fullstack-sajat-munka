import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // ha nincs user és belépést igénylő oldalra kattinta
    if (!this.auth.currentUserValue) {
    // átirányítjuk a login oldalra
      this.router.navigate(['login']);
            return false;
          }
      // ha van felhasználó, akkor true
      return true;
  }
}
