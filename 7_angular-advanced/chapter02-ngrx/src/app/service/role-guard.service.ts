import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // aktivált route-t kapja paraméterként
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];


    if (!this.auth.currentUserValue || !this.auth.currentUserValue.role || this.auth.currentUserValue.role < expectedRole) {
      // átnavigálás egy olyan oldalra, ahol megtagadjuk a hozzáférést
      this.router.navigate(['forbidden']);
      return false;
    }
    // ha minden rendben volt, akkor true
    return true;
  }
}
