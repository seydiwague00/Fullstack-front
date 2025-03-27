import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantService} from '../../services/etudiant.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UpdateEtudiantComponent} from '../update-etudiant/update-etudiant.component';
import {DeleteStudentComponent} from '../delete-student/delete-student.component';
import {debounceTime, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-etudiant',
  standalone: false,
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource<Etudiant>();
  public displayedColumns: string[] = ["codeEtudiant", "nom", "prenom", "email", "niveauEtude", "actions"];

  searchTerm: string = '';
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private etudiantService: EtudiantService,
    protected authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getAllEtudiants();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  filterStudents(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchTerm = filterValue;

    this.isLoading = true;

    this.etudiantService.getFilteredStudents(this.searchTerm).pipe(
      debounceTime(300),
      catchError(error => {
        console.error('Erreur lors de la récupération des étudiants:', error);
        this.isLoading = false;
        return of([]);
      })
    ).subscribe(students => {
      this.isLoading = false;
      this.dataSource.data = students;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  updateStudent(student: Etudiant): void {

    const dialogRef = this.dialog.open(UpdateEtudiantComponent, {
      width: '500px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllEtudiants();
      }
    });
  }

  deleteStudent(etudiant: Etudiant): void {
    if (!this.authService.isAdmin()) {
      this.snackBar.open("Salam Aleykoum haa, vous n'avez pas l'autorisation 🤣❌", 'Fermer', {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    } else {
      const dialogRef = this.dialog.open(DeleteStudentComponent, {
        width: '400px',
        data: {codeEtudiant: etudiant.codeEtudiant, nom: etudiant.nom, prenom: etudiant.prenom}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllEtudiants();
        }
      });
    }
  }
}
