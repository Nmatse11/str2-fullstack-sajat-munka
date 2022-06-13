import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ILoginData  } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //login adatok
  //loginData: { email?: string, password?: string } = {};
  loginData: ILoginData = {};

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  onLogin(): void {
    //console.log(this.loginData)
    this.auth.login(this.loginData);
  }

}
