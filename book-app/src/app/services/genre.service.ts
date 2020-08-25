import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Permet la réalisation d'actions sur l'API Genre pour la manipulation de ressources de type Genre
export class GenreService {

  private url = "http://localhost:8000/genre"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genre[]>
  {
    return this.http.get<Genre[]>(this.url);
  }

  get(id: number): Observable<Genre>{
    return this.http.get<Genre>(`${this.url}/${id}`);
  }

  create(genre: Genre): Observable<Genre>{
    return this.http.post<Genre>(this.url, genre);
  }

  update(genre: Genre): Observable<Genre>{
    return this.http.put<Genre>(`${this.url}/${genre.id}`, genre);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
