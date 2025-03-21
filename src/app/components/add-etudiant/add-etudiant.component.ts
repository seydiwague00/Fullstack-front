import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EtudiantService} from '../../services/etudiant.service';
import {Etudiant} from '../../models/etudiant.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-etudiant',
  standalone: false,
  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.css'
})
export class AddEtudiantComponent {

  public studentFormGroup!: FormGroup;

  public selected: string = 'none';

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.studentFormGroup = this.formBuilder.group({
      codeEtudiant: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      niveauEtude: [this.selected, Validators.required]
    });
  }

  addStudent() {
    if (this.studentFormGroup.valid) {
      const data = {
        codeEtudiant: this.studentFormGroup.value.codeEtudiant,
        nom: this.studentFormGroup.value.nom,
        prenom: this.studentFormGroup.value.prenom,
        email: this.studentFormGroup.value.email,
        niveauEtude: this.studentFormGroup.value.niveauEtude
      };

      this.etudiantService.createEtudiant(data).subscribe({
        next: (res) => {
          this.submitted = true;

          this.snackBar.open('Ajout réussie ! ✅', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

          this.resetForm()
        },
        error: (e) => {
          console.error(e);

          this.snackBar.open('Erreur lors de la création de l\'étudiant.', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-error'],
          });
        }
      });
    } else {
      console.log("Formulaire invalide");

      this.snackBar.open("Erreur lors de l'ajout de l'étudiant' ❌", 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });

      this.resetForm();
    }
  }

  resetForm(): void {
    this.studentFormGroup.reset();
    this.selected = 'none';
  }
}
