import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EtudiantService} from '../../services/etudiant.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Etudiant} from '../../models/etudiant.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-etudiant',
  standalone: false,
  templateUrl: './update-etudiant.component.html',
  styleUrl: './update-etudiant.component.css'
})
export class UpdateEtudiantComponent {
  studentForm: FormGroup;

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
      niveauEtude: [this.data.niveauEtude, Validators.required]
    });
  }

  saveChanges() {
    if (this.studentForm.valid) {
      const data = {
        codeEtudiant: this.studentForm.value.codeEtudiant,
        nom: this.studentForm.value.nom,
        prenom: this.studentForm.value.prenom,
        email: this.studentForm.value.email,
        niveauEtude: this.studentForm.value.niveauEtude.toUpperCase()
      };

      this.etudiantService.updateEtudiant(data).subscribe({
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
