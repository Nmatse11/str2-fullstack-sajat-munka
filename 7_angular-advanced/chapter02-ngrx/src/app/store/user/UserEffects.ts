import { catchError, Observable, of, switchMap, withLatestFrom, tap, mergeMap } from 'rxjs';
import { ERROR_ITEM, getItems, getOneItem, LOAD_ITEMS, LOAD_SELECTED_ITEM, LOAD_UPDATED_ITEM, updateItem, addItem, LOAD_ADDED_ITEM, deleteItem, REMOVE_ITEM } from './UserActions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/service/user.service';
import { Action, Store } from '@ngrx/store';
import { User } from 'src/app/model/user';

@Injectable()


export class UserEffect {

  // eseményfigyelő - Observable-t ad vissza
  // UserActions loadItems-vel van párba
  loadItems$ = createEffect( (): Observable<Action> => {
    // action-ok figyelése
    return this.actions$.pipe(
    // az actionok közül melyiknél fusson le ez a pipe, ha nem jó a típus, akkor nem fog továbbmenni
    // kommunikál a service az Effect-tel
    // figyeli, hogy a getItems action mikor lett megszólítva
    ofType(getItems),
      // ha megjöttek az adatok továbbmegyünk
      // get() metódussal lekérjük az adatokat
      switchMap( () => this.userService.get() ),
      // of - Observable-t ad vissza
      // type - melyik esemény valósult meg, items az adatok
      // összeállítva azt a formátumú adatot, amit az általunk megírt Action követel - loadItems Action-ben
      // továbbküldés a store-nak
      switchMap( users => of({ type: LOAD_ITEMS, items: users })),
      // hibakezelés
      catchError( error => of({ type: ERROR_ITEM, error })),
    );
  });

  getOneItem$ = createEffect( (): Observable<Action> => {
    // action-ok figyelése
    return this.actions$.pipe(
    // a getOneItem Action határása lefutó effect
    ofType(getOneItem),
      // az utolsó adathoz hozzá csak egy újat - egy objektumot
      // ebben az esetben a store$ lesz
      withLatestFrom(this.store$),
      // id alapján lekérés - ha id-t kap, akkor csak egyet ad vissza
      // switchMap( action => this.userService.get(action.id) ),
      // ebben az esetben nem csak a action-t kapja meg, hanem a store-t is
      switchMap( ([action, store]) => {
        // mielőtt lekérjük a netről megvizsgáljuk, hogy az action benne van-e a store-ban
        const cache = store.users?.items?.find( (item: User) => item.id === action.id );
        // ha van cache, akkor Observable-vé alakítjuk a cache-t, ha nincs akkor lekérjük a netről
          return cache ? of(cache) : this.userService.get(action.id);
         } ),
      // Action-ból látszik, hogy egy selected-et vár
      // Reducerbe adtuk meg, hogy action.selected-et ad vissza, ami a user
      switchMap( user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError( error => of({ type: ERROR_ITEM, error })),
    );
  });

  updateItem$ = createEffect( (): Observable<Action> => {
    // action-ok figyelése
    return this.actions$.pipe(
    // updateImte Action-ra figyel
    ofType(updateItem),
      // update metódus használata
      switchMap( action => this.userService.update(action.item) ),
      // továbbküldjük a store-nak
      switchMap( user => of({ type: LOAD_UPDATED_ITEM, item: user })),
      catchError( error => of({ type: ERROR_ITEM, error })),
    );
  });

  addItem$ = createEffect( (): Observable<Action> => {
    // létrehozunk egy üres változót
    let lastAction: { item: User }
    // action-ok figyelése
    return this.actions$.pipe(
    // addItem Action-ra figyel
    ofType(addItem),
      // hozzányúlok az adatokhoz - lekérjük az utolsó action-t
      tap( action => lastAction = action ),
      // create metódus használata -létrejön az új user - ez tokent add vissza
      // switchMap( action => this.userService.create(action.item) ),
      // mivel ha error ágra fut a dolog, akkor nem tudjuk újra meghívni az action-t, ezért a http-kérésnél kell kezelni a hibát
      // switchMap helyett mergeMap - összefűzés
      // ezt pipe-juk tovább
      // beemeljük a kód további részét
      // így nem az action-ban lesz a hiba és nem itt lesz a hibakezelés sem
      // az action-t akárhányszor fel lehet használni
      mergeMap( action => this.userService.create(action.item).pipe(
        // újonnan hozzáadott user lekérése query-vel
        switchMap( () => this.userService.query(`email=${lastAction.item.email}`) ),
        // továbbküldjük a store-nak
        switchMap( user => of({ type: LOAD_ADDED_ITEM, item: user })),
        catchError( error => of({ type: ERROR_ITEM, error })),
      ) ),
    );
  });

  deleteItem$ = createEffect( (): Observable<Action> => {
    // üres változó
    let lastAction: { item: User }
    return this.actions$.pipe(
    ofType(deleteItem),
      // utolsó action cache-elése
      tap( action => lastAction = action ),
      // delete metódus használata - törlődik a user
      switchMap( action => this.userService.delete(action.item) ),
      // a törölt user-t törli a store-ból
      switchMap( user => of({ type: REMOVE_ITEM, item: lastAction.item })),
      catchError( error => of({ type: ERROR_ITEM, error })),
    );
  });

  constructor(
  private actions$: Actions,
  private userService: UserService,
  private store$: Store<any>
  ) { }

}
