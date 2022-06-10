import { loadItems, errorItem, loadSelectedItem, loadUpdatedItem, loadAddedItem, removeDeletedItem, errorFlush } from './UserActions';
import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";

// megmondjuk, hogy a State milyen adatokat tároljon
export interface State {
  // string kulccsal bármikor fel tudja venni adatot a State-be
  [x: string]: any;
  // ki kell egészíteni a selected?: null-lal, hogy egyet is le tudjunk kérni
  //users: { items: User[], selected?: User, error: string };
  // hibakezeléshez át kell írni az error-t stringről any-ra
  users: { items: User[], selected?: User, error: any };
}

// létrehozzuk az initailState
export const initialState: State = {
  // ki kell egészíteni a selected?: null-lal, hogy egyezzen az interface.val
  //users: { items: [], selected: User, error: '' }
  // hibakezeléshez az error nem üres string, hanem null - alapértelmezetten nincs hiba
  users: { items: [], selected: User, error: null }
};

// Reducer létrhozása (createReducer)
export const UserReducer = createReducer(
  initialState,
  // on() - eseményfigyelő
  // Actions metódusokra figyel
  // kiolvassa az adatokat a action-ból és beleteszi a megfelelő state-ba items néven
  // loadItems, amikor az egész tömböt betöltöm
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  // loadSelectedItem - csak egy adat betöltése
  on(loadSelectedItem, (state, action) => ({
    ...state,
    // ennek az action-ja a selected
    selected: action.selected
  })),
  // loadSeUpdatedItem figyelése
  on(loadUpdatedItem, (state, action) => ({
    ...state,
    items: ((users): User[] => {
      // a módosítani kivánt user indexének kikeresése
      const index = users['items'].findIndex( (item: User) => item.id === action.item.id );
      // spredeljük a store-t, mert inmutable - készítünk belőle egy másolatot
      const newItems = [...users['items']];
      // az új tömbnek az index-edik elemje legyen egyenlő az Actionból kapott user-rel
      newItems[index] = action.item;
      return newItems;
    })(state)
  })),
  // loadAddedItem figyelése
  on(loadAddedItem, (state, action) => ({
    ...state,
    // a teljes state frissítése - concat()-tal összefűzöm a két tömböt egymással
    // push nem jó, mert a state nem módosítható
    items: (state['items'] as User[]).concat(action.item)
  })),
  // removeDeletedItem figyelése
  on(removeDeletedItem, (state, action) => ({
    ...state,
    // filterrel választjuk ki az adatokból a törölt user-en kívül mindegyiket
    items: (state['items'] as User[]).filter( item => item.id !== action.item.id )
  })),
  // hiba továbbküldése
  on(errorItem, (state, action) => ({
    ...state,
    //error: action.message
    // hibakezelésnél nem message string
    // az átírt paramétert kell megadni
    error: action.error
  })),
  // errorFlush figyelése
  on(errorFlush, (state, action) => ({
    ...state,
    // kitöröljük az error-t
    error: null
  })),
);

// Selectors
// ha megjöttek az adatok, akkor az items-et kiszelektálja
// szól a componensnek, hogy megjöttek az adatok a megfelelő formátumban
export const selectItems = (state: State) => state.users.items;
// egy user lekéréséhez szükséges selector
// Object.assign-ra azért van szükség, mert a store-ban lévő adatok inmutable-k, vagyis nem lehet őket módosítani
// kell az Object.assign , higy az űrlapon módosítani tudjunk
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);
//export const selectError = (state: State) => state.users.error;
// nem biztos, hogy van hiba - error üzenet a http-error-ból
// azért is kell a ?-jel, mert töröljük a beragadt error-t a store-ból
export const selectError = (state: State) => state.users.error?.error;
