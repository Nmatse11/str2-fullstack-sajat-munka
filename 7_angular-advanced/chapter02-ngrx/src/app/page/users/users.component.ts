import { selectItems, selectError } from './../../store/user/UserReducers';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';
import { addItem, deleteItem, errorFlush, getItems } from 'src/app/store/user/UserActions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //list$: Observable<User | User[] | null> = this.userService.get()
  //list$: Observable<User[]> = this.userService.getAll()
  // list$!: Observable<User | User[]>
  list$!: Observable<User[]>

  // Config service-be felvett oszlopnevek használata
  cols: {key: string, label: string}[] = this.config.userColumns;

  // error megjelenítéséhez a store-ból le kell kérni a selectError szelektor segítségével
  error$ = this.store.pipe( select(selectError) ).pipe(
    // megnézzük a hibát
    tap( error => {
      // csak 3mp-ig lehessen látni
      const to = setTimeout( () => {
      clearTimeout(to);
      // esemény kiváltása az Action-ban
      this.store.dispatch(errorFlush());
      }, 3000);
    })
  );

  constructor(
    private userService: UserService,
    private config: ConfigService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    // innen indul minden - esemény kiváltása - Actionból
    this.store.dispatch(getItems());
    // selector-tól várja az adatot, amíg megérkezik - feliratkozik rá
    this.list$ = this.store.pipe( select(selectItems) );
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
          // válasz kilogolása
          userResponse => console.log(userResponse),
          err => console.error(err)
        );
  }

  // nem csinálunk új űrlapot, hanem megadjuk az adatokat
  create(): void {
    const user = new User();
    user.first_name = 'New';
    user.last_name = 'User';
    user.email = 'test@test.org';
    user.password = 'test';
    // esemény kiváltása az Action-ban
    this.store.dispatch( addItem({item: user}) );
  }

  delete(user: User): void {
    if (!confirm('Are you sure?')) {
      return;
    }
  // esemény kiváltása az Action-ban
    this.store.dispatch(deleteItem( {item: user}) );
  }

}
