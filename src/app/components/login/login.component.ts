import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;
  private snackBar!: MatSnackBar

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  login() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;

    this.authenticationService.login(username, password).subscribe({
      next: result => {
        this.authenticationService.loadProfile(result);
        this.router.navigate(['/admin']);
      }, error: error => {
        console.log(error);
        this.showErrorSnackbar('Échec de la connexion. Vérifiez vos identifiants.');
      }
    });
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar'] // Ajout d'une classe CSS personnalisée
    });
  }
}
