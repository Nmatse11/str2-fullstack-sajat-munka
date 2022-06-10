import { switchMap,take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { getOneItem, updateItem } from 'src/app/store/user/UserActions';
import { select, Store } from '@ngrx/store';
import { selectOneItem } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  //user!: User;
  user$!: Observable<User>;
  userID!: number;
  serverError = '';

  constructor(
      private userService: UserService,
      private ar: ActivatedRoute,
      private store: Store<any>
    ) { }

    ngOnInit(): void {
      // userID lekérdése az ActivatedRoute-ból
      this.userID = parseInt(this.ar.snapshot.params['id'], 10);
      // esemény kiváltása - Actionból, megkapja az id-t
      this.store.dispatch( getOneItem({id: this.userID}) );
      // selector-tól várja az adatot, amíg megérkezik - feliratkozik rá
      this.user$ = this.store.pipe( select(selectOneItem) );

      /*// kiszedjük az id-t az activetedRoute-ből
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
      );*/
    }

    onSubmit(ngForm: NgForm): void {
      // user létrehozása, az ngForm-ban megadott adatok spred-elve és az id
      const user: User = ({...ngForm.value, id: this.userID});
      // esemény kiváltása ezzel a user-rel az Action-ból
      this.store.dispatch( updateItem({item: user}) );
      // visszatérés az előző oldalra
      history.back();

      //mivel az ngForm-ban minden adat benne van, csak az id nem
      /*const putObject = Object.assign({id: this.user.id}, ngForm.value);
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
        );*/
    }

}
