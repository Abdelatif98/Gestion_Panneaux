import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../model/location.model';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8090/api/Location/';
  private baseUrl1 = 'http://localhost:8090/api/Location/1/';
  private baseUrl2 = 'http://localhost:8090/api/Location/2/';
  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/${id}`);
  }
  getByEntreprise(entreprise: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl2}/${entreprise}`);
  }
  getByPanneau(panneau: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl1}/${panneau}`);
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
  deleteByEntreprise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl1}/${id}`, { responseType: 'text' });
  }
  transformDate(date){
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
