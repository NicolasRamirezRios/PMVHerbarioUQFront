import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especimen } from '../models/especimen.model';

@Injectable({
  providedIn: 'root'
})
export class EspecimenService {
  private apiUrl = 'http://localhost:8010/api/especimenes';

  constructor(private http: HttpClient) { }

  getEspecimenes(): Observable<Especimen[]> {
    return this.http.get<Especimen[]>(this.apiUrl);
  }

  createEspecimen(especimen: Especimen): Observable<Especimen> {
    return this.http.post<Especimen>(this.apiUrl, especimen);
  }

  updateEspecimen(id: number, especimen: Especimen): Observable<Especimen> {
    return this.http.put<Especimen>(`${this.apiUrl}/${id}`, especimen);
  }

  deleteEspecimen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}