import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Format } from '../format';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private url = "http://localhost:8000/format"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Format[]>
  {
    return this.http.get<Format[]>(this.url);
  }

  get(id: number): Observable<Format>{
    return this.http.get<Format>(`${this.url}/${id}`);
  }

  create(format: Format): Observable<Format>{
    return this.http.post<Format>(this.url, format);
  }

}
