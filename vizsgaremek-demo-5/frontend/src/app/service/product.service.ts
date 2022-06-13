
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list: Product[] = [
    {
      _id: '12442fssa',
      name: 'Vasaló',
      description: 'jó vasaló ha vasal a ló',
      price: 22000,
      active: true
    },
    {
      _id: '414fa4sd6fas',
      name: 'Vasaló',
      description: 'jó vasaló ha vasal a ló',
      price: 22000,
      active: true
    },
    {
      _id: 'fsa4876461',
      name: 'Vasaló',
      description: 'jó vasaló ha vasal a ló',
      price: 22000,
      active: true
    },
    {
      _id: '464fsa14rz4h',
      name: 'Vasaló',
      description: 'jó vasaló ha vasal a ló',
      price: 22000,
      active: true
    }
  ];

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  /*getAll(): Observable<Product[]>{
    const list = [];
    for (let i=0; i < 25; i++){
      const item = [...this.list]
      for (let j = 0; j < item.length; j++) {
        item[j]._id = `id-${ Math.round ( Math.random() * 100000 ) }`;
        list.push(item[j]);
      }
    }
    return of(list)
  }*/

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}product`)
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}product/${id}`);
  }

  update(entity: Product): Observable<Product> {
    const id = entity._id;
    // id? - nem szabad kötelezőnek lennie
    delete entity._id;
    return this.http.patch<Product>(
      `${this.apiUrl}product/${id}`,
      entity,
    );
  }

}
