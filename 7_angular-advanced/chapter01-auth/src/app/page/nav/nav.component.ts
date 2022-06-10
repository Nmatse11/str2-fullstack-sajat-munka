import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  navigation = this.config.navigation
  // a bejelentkezés állapota
  loginStatus = false;
  userSub!: Subscription;
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // feliratkozás, hogy értesüljünk arról, hogy változik a user állapota
    this.userSub = this.auth.currentUserSubject.subscribe(
      // itt nem lehet hibe, mert vagy usert kapunk, vagy null-t
      user => this.user = user
    );
  }

  ngOnDestroy(): void {
    // feliratkozásról leiratkozom
    this.userSub.unsubscribe()
  }

  onLogout() {
    // kattintásra meghívjuk a logout metódust
    this.auth.logout()
  }

}
