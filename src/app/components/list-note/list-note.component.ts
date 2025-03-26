import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {MatTableDataSource} from '@angular/material/table';
import {Note} from '../../models/note.model';

@Component({
  selector: 'app-list-sport',
  standalone: false,
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent implements OnInit, AfterViewInit {
  public datasource = new MatTableDataSource<Note>();
  displayedColumns: string[] = ["id","matiere","valeur"];

  constructor(private sportService: NoteService) {
  }

  ngOnInit() {
    this.getSports()
  }

  ngAfterViewInit() {
  }

  getSports():void {
    this.sportService.getAllSports().subscribe((data) => {
      this.datasource.data = data;
    })
  }

  addSport() {

  }
}
