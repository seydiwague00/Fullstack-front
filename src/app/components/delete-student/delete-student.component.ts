import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EtudiantService} from '../../services/etudiant.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-student',
  standalone: false,
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.css'
})
export class DeleteStudentComponent {

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codeEtudiant: string, nom: string, prenom: string },
    private etudiantService: EtudiantService
  ) {
  }

  confirmDelete(): void {
    this.etudiantService.deleteEtudiant(this.data.codeEtudiant).subscribe({
      next: () => {
        this.snackBar.open('Suppression réussie ! ✅', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        alert("Erreur lors de la suppression. Veuillez réessayer.");
        console.error("Erreur suppression:", error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
