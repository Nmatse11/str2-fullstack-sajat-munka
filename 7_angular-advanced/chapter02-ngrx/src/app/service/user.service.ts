import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entity = 'users'

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  // felhasználó adatait lekéri a szerverről
  get(id?: string | number): Observable<User | User[] | null> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      // ha van id, akkor ezt is hozzáfűzzük az url-hez
      url += `/${id}`
    }

    // adatok lekérdezése
    return this.http.get<User[]>(url)
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiUrl}${this.entity}`);
  }

  query(queryString: string): Observable<User | User[] | null> {
    // queryString-gel le tud kérni adatokat a serverről
    let url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    // adatok lekérdezése
    return this.http.get<User[]>(url)
  }

  update(user: User): Observable<User> {
    let url = `${this.config.apiUrl}${this.entity}/${user.id}`;
    return this.http.patch<User>(url, user)
  }

  create(user: User): Observable<User> {
    const url = `${this.config.apiUrl}${this.entity}`;
    return this.http.post<User>(url, user);
  }


  delete(user: User): Observable<User> {
    const url = `${this.config.apiUrl}${this.entity}/${user.id}`;
    return this.http.delete<User>(url);
  }
}
