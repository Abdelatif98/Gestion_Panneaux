import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Location} from '../model/location.model';
import {Panneau} from '../model/panneau.model';

@Injectable({
  providedIn: 'root'
})
export class PanneauService {
  private baseUrl = 'http://localhost:8090/api/Panneau/';
  private baseUrl1 = 'http://localhost:8090/api/Panneau/1/';
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getById(id: number): Observable<Panneau> {
    return this.http.get<Panneau>(`${this.baseUrl}/${id}`);
  }
  getByEtat(etat: number): Observable<Panneau[]> {
    return this.http.get<Panneau[]>(`${this.baseUrl1}/${etat}`);
  }
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteData(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
