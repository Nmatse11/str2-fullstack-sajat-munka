import { switchMap,take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user!: User;
  serverError = '';

  constructor(
      private userService: UserService,
      private ar: ActivatedRoute,
    ) { }

    ngOnInit(): void {
      // kiszedjük az id-t az activetedRoute-ből
      this.ar.params.pipe(
        switchMap( params => this.userService.get(params['id']) )
      )
      // take(1) csak az első válaszig megy és utána leiratkozik, nem kell az onsubsribe
      .pipe( take(1) )
      .subscribe(
        user => {
          this.user = (user as User);
          this.user.password = '';
        }
      );
    }

    onSubmit(ngForm: NgForm): void {
      //mivel az ngForm-ban minden adat benne van, csak az id nem
      const putObject = Object.assign({id: this.user.id}, ngForm.value);
      this.userService.update(putObject)
          .toPromise().then(
            //megtörtént a mentés - visszalépünk egyet
            user => history.back(),
        err => {
        this.serverError = err.error;
        // a hiba megint 3mp-ig látható
            const to = setTimeout( () => {
            clearTimeout(to);
            this.serverError = '';
            }, 3000);
          }
        );
    }

}
