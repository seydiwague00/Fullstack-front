import {Component, OnInit} from '@angular/core';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantService} from '../../services/etudiant.service';

@Component({
  selector: 'app-etudiant',
  standalone: false,
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;
  newEtudiant: Etudiant = new Etudiant();

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getAllEtudiants();
  }

  getAllEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }

  getEtudiant(id: number): void {
    this.etudiantService.getEtudiantById(id).subscribe((data) => {
      this.selectedEtudiant = data;
    });
  }

  createEtudiant(): void {
    this.etudiantService.createEtudiant(this.newEtudiant).subscribe((data) => {
      this.etudiants.push(data);
      this.newEtudiant = new Etudiant(); // Réinitialiser le formulaire
    });
  }

  addEtudiants(): void {
    const newEtudiants: Etudiant[] = [
      new Etudiant(), // Ajoutez vos objets étudiants ici
      new Etudiant()
    ];
    this.etudiantService.addEtudiants(newEtudiants).subscribe((data) => {
      this.etudiants.push(...data);
    });
  }

  updateEtudiant(code_etudiant: string): void {
    if (this.selectedEtudiant) {
      this.etudiantService.updateEtudiant(code_etudiant, this.selectedEtudiant).subscribe((data) => {
        const index = this.etudiants.findIndex(etudiant => etudiant.codeEtudiant === code_etudiant);
        if (index !== -1) {
          this.etudiants[index] = data;
        }
        this.selectedEtudiant = null; // Réinitialiser après la mise à jour
      });
    }
  }

  deleteEtudiant(code_etudiant: string): void {
    this.etudiantService.deleteEtudiant(code_etudiant).subscribe(() => {
      this.etudiants = this.etudiants.filter(etudiant => etudiant.codeEtudiant !== code_etudiant);
    });
  }
}
