import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from '../../services/etudiant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Etudiant } from '../../models/etudiant.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-update-etudiant',
  standalone: false,
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.css']
})
export class UpdateEtudiantComponent {
  studentForm: FormGroup;

  matieres: string[] = ['Mathématiques', 'Physique', 'Chimie', 'Informatique', 'Biologie'];

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Etudiant
  ) {
    this.studentForm = this.fb.group({
      codeEtudiant: [this.data.codeEtudiant, Validators.required],
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      niveauEtude: [this.data.niveauEtude, Validators.required],
      notes: this.fb.array([])  // Ajout du FormArray pour les notes
    });

    // Initialisation des notes de l'étudiant
    if (this.data.notes && this.data.notes.length > 0) {
      this.setNotes(this.data.notes);
    }
  }

  // Getter pour accéder facilement aux notes dans le formulaire
  get notes(): FormArray {
    return this.studentForm.get('notes') as FormArray;
  }

  // Méthode pour initialiser les notes dans le formulaire
  setNotes(notes: Note[]): void {
    const noteFormGroups = notes.map(note => this.fb.group({
      id: [note.id],  // Garder l'ID pour mettre à jour
      matiere: [note.matiere, Validators.required],
      valeur: [note.valeur, [Validators.required, Validators.min(0), Validators.max(20)]]
    }));

    // Ajouter chaque note dans le FormArray
    noteFormGroups.forEach(noteFormGroup => this.notes.push(noteFormGroup));
  }

  // Ajouter une nouvelle note
  addNote(): void {
    const noteFormGroup = this.fb.group({
      matiere: ['', Validators.required],
      valeur: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
    this.notes.push(noteFormGroup);
  }

  // Supprimer une note
  removeNote(index: number): void {
    this.notes.removeAt(index);
  }

  // Vérifier si une note est nouvelle (permet d'afficher la liste déroulante)
  isNewNote(index: number): boolean {
    return this.notes.at(index).value.id == null;
  }

  // Sauvegarder les modifications
  saveChanges(): void {
    if (this.studentForm.valid) {
      const updatedData = {
        ...this.studentForm.value,
        niveauEtude: this.studentForm.value.niveauEtude.toUpperCase()
      };

      this.etudiantService.updateEtudiant(updatedData).subscribe({
        next: (message) => {
          this.snackBar.open('Mise à jour réussie ! ✅', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

          setTimeout(() => {
            this.dialogRef.close(true);
          }, 1500);
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la mise à jour ❌', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });

          console.error('Erreur lors de la mise à jour', error);
        }
      });
    }
  }

  // Fermer le dialogue sans enregistrer
  closeDialog(): void {
    this.dialogRef.close();
  }
}
