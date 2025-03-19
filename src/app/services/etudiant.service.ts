import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant} from '../models/etudiant.model'; // Assurez-vous de créer cette classe

@Injectable({
  providedIn: 'root'
})

export class EtudiantService {
  private apiUrl = 'http://localhost:8095/api/etudiants'; // Modifiez l'URL en fonction de votre backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les étudiants
  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  // Récupérer un étudiant par ID
  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  // Créer un étudiant
  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant);
  }

  // Ajouter une liste d'étudiants
  addEtudiants(etudiants: Etudiant[]): Observable<Etudiant[]> {
    return this.http.post<Etudiant[]>(`${this.apiUrl}/add-students`, etudiants);
  }

  // Mettre à jour un étudiant
  updateEtudiant(code_etudiant: string, etudiantDetails: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${code_etudiant}`, etudiantDetails);
  }

  // Supprimer un étudiant
  deleteEtudiant(code_etudiant: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code_etudiant}`);
  }
}
