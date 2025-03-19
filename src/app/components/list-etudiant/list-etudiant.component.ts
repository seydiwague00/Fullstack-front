import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Etudiant} from '../../models/etudiant.model';
import {EtudiantService} from '../../services/etudiant.service';

@Component({
  selector: 'app-list-etudiant',
  standalone: false,
  templateUrl: './list-etudiant.component.html',
  styleUrl: './list-etudiant.component.css'
})
export class ListEtudiantComponent implements OnInit, AfterViewInit {

  etudiants: Etudiant[] = [];

  public students: any;
  public dataSource: any;
  // public displayedColumns: any = ["id", "firstName", "lastName", "age", "actions"];
  public displayedColumns: any = ["codeEtudiant", "nom", "prenom", "email", "niveauEtude","actions"];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private etudiantService: EtudiantService) {
  }

  ngOnInit() {
    // for (let i = 1; i < 50; i++) {
    //   this.students.push(
    //     {
    //       id: i,
    //       firstName: Math.random().toString(20),
    //       lastName: Math.random().toString(20),
    //       age: Math.floor(Math.random() * (30 - 18 + 1)) + 18,
    //     }
    //   );
    // }
    this.getAllEtudiants();
    this.dataSource = new MatTableDataSource(this.etudiants);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }
}
