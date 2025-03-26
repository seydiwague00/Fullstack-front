import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Etudiant} from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8095/api/etudiants';

  constructor(private http: HttpClient) {
  }

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<Etudiant>(this.apiUrl, etudiant, {headers}).pipe(
      catchError(error => {
        console.error('Erreur lors de la création de l\'étudiant', error);
        return throwError(() => new Error('Erreur serveur. Veuillez réessayer plus tard.'));
      })
    );
  }

  updateEtudiant(etudiant: Etudiant): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<string>(`${this.apiUrl}/updateByCodeEtudiant`, etudiant, {headers})
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la mise à jour', error);
          return throwError(() => new Error('Erreur serveur. Veuillez réessayer plus tard.'));
        })
      );
  }

  deleteEtudiant(codeEtudiant: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codeEtudiant}`);
  }

  getFilteredStudents(filter: string): Observable<any[]> {
    const params = new HttpParams().set('filter', filter);  // Ajouter le terme de recherche en tant que paramètre
    return this.http.get<any[]>(`${this.apiUrl}/filteredStudents`, { params });
  }
}
