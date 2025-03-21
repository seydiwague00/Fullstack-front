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

  public student: Etudiant = {
    codeEtudiant: '',
    nom: '',
    prenom: '',
    email: '',
    niveauEtude: ''
  };

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

  // addStudent() {
  //   if (this.studentFormGroup.valid) {
  //     // console.log(this.studentFormGroup.value);
  //     const data = {
  //       codeEtudiant: this.studentFormGroup.value.codeEtudiant,
  //       nom: this.studentFormGroup.value.nom,
  //       prenom: this.studentFormGroup.value.prenom,
  //       email: this.studentFormGroup.value.email,
  //       niveauEtude: this.studentFormGroup.value.niveauEtude
  //     }
  //     console.log(data);
  //
  //     this.etudiantService.createEtudiant(data).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted = true;
  //       },
  //       error: (e) => console.error(e)
  //     });
  //   } else {
  //     console.log("Formulaire invalide");
  //   }
  // }

  addStudent() {
    if (this.studentFormGroup.valid) {
      const data = {
        codeEtudiant: this.studentFormGroup.value.codeEtudiant,
        nom: this.studentFormGroup.value.nom,
        prenom: this.studentFormGroup.value.prenom,
        email: this.studentFormGroup.value.email,
        niveauEtude: this.studentFormGroup.value.niveauEtude
      };

      console.log(data);

      this.etudiantService.createEtudiant(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;

          this.snackBar.open('Étudiant créé avec succès!', 'Fermer', {
            duration: 3000,
            panelClass: ['snack-bar-success'],
          });

          window.location.reload();
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

      this.snackBar.open('Veuillez remplir correctement le formulaire.', 'Fermer', {
        duration: 3000,
        panelClass: ['snack-bar-error'],
      });
    }
  }

  resetForm(): void {
    this.studentFormGroup.reset();
    this.selected = 'none';
  }
}
