import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Note} from '../models/note.model'
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8095/api/sports';

  constructor(private http: HttpClient) {
  }

  getAllSports(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}`);
  }

  getSport(name: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${name}`);
  }

  addSport(note: Note): Observable<Note> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Note>(`${this.apiUrl}/${note}`, note, {headers}).pipe(
      catchError(error => {
          console.error("Erreur los de l'ajout du note", error);
          return throwError(() => new Error(
            "Erreur serveur. Veuillez réessayer plus tard." + error.message)
          );
        }
      )
    )
  }

  updateSport(id: number, sport: Note): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.put<string>(`${this.apiUrl}/${id}`, sport, {headers})
      .pipe(
        catchError(error => {
            console.error("Erreur lors de la mise à jour," + error);
            return throwError(() => new Error('Erreur serveur. Veuillez réessayer plus tard.'));
          }
        )
      )

  }
}
