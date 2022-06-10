import { createAction, props } from "@ngrx/store";
import { User } from 'src/app/model/user'

// Constant names for actions
// exportálva vannak, ezért mindenhonnan elérhetőek
export const GET_ITEMS = '[User] get items';
export const GET_ONE_ITEM = '[User] get item';

export const LOAD_ITEMS = '[User] load items';
export const LOAD_SELECTED_ITEM = '[User] load selected';

export const UPDATE_ITEM = '[User] update item';
export const LOAD_UPDATED_ITEM = '[User] load updated';

export const ADD_ITEM = '[User] add item';
export const LOAD_ADDED_ITEM = '[User] load added';

export const DELETE_ITEM = '[User] delete item';
export const REMOVE_ITEM = '[User] remove added';

export const FLUSH_ERROR = '[User] error flush';

export const ERROR_ITEM = '[User] error item';

// Actions

// az összes User-t lekérése
// componens megszólítja az ngOnInit-ben - ezt figyeli a Effect
export const getItems = createAction(GET_ITEMS);

// egy user lekérése
export const getOneItem = createAction(GET_ONE_ITEM, props<{id: string | number}>());

// egy user frissítése
export const updateItem = createAction(UPDATE_ITEM, props<{item: User}>());

// egy user létrehozása
export const addItem = createAction(ADD_ITEM, props<{item: User}>());

// egy user törlése
export const deleteItem = createAction(DELETE_ITEM, props<{item: User}>());

// userek betöltés
// props - milyen paraméterekkel hívom meg
export const loadItems = createAction(LOAD_ITEMS, props<{items: User[]}>());

// egy user betöltése
export const loadSelectedItem = createAction(LOAD_SELECTED_ITEM, props<{selected: User}>());

// egy frissített user-t betölti
export const loadUpdatedItem = createAction(LOAD_UPDATED_ITEM, props<{item: User}>());

// a létrehozott új user betöltése
export const loadAddedItem = createAction(LOAD_ADDED_ITEM, props<{item: User}>());

// eltávolítja a store-ból a sikeresen törölt user-t
export const removeDeletedItem = createAction(REMOVE_ITEM, props<{item: User}>());

// error üzenetek törlése a store-ból, hogy legyen hely az újakra
// a beragadt hibákat kitörli a store-ból
export const errorFlush = createAction(FLUSH_ERROR);

// error esetén
// export const errorItem = createAction(ERROR_ITEM, props<{message: string}>());
export const errorItem = createAction(ERROR_ITEM, props<{error: any}>());
