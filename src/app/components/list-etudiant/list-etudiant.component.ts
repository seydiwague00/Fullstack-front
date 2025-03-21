import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantService} from '../../services/etudiant.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UpdateEtudiantComponent} from '../update-etudiant/update-etudiant.component';
import {DeleteStudentComponent} from '../delete-student/delete-student.component';

@Component({
  selector: 'app-list-etudiant',
  standalone: false,
  templateUrl: './list-etudiant.component.html',
  styleUrl: './list-etudiant.component.css'
})
export class ListEtudiantComponent implements OnInit {

  etudiants: Etudiant[] = [];
  public dataSource = new MatTableDataSource<Etudiant>;
  public displayedColumns: string[] = ["codeEtudiant", "nom", "prenom", "email", "niveauEtude", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private etudiantService: EtudiantService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllEtudiants();
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getAllEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      this.etudiants = data;
      this.dataSource = new MatTableDataSource(this.etudiants);
    });
  }


  filterStudents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
    const dialogRef = this.dialog.open(DeleteStudentComponent, {
      width: '400px',
      data: {codeEtudiant: etudiant.codeEtudiant, nom: etudiant.nom, prenom: etudiant.prenom}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir la liste après suppression
        this.getAllEtudiants();
      }
    });
  }
}
