import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEtudiantComponent} from './components/list-etudiant/list-etudiant.component';
import {AddEtudiantComponent} from './components/add-etudiant/add-etudiant.component';
import {UpdateEtudiantComponent} from './components/update-etudiant/update-etudiant.component';
import {DeleteStudentComponent} from './components/delete-student/delete-student.component';
import {ListNoteComponent} from './components/list-note/list-note.component';

const routes: Routes = [
  {path: '', redirectTo: '/listStudents', pathMatch: 'full'},
  {path: "listStudents", component: ListEtudiantComponent},
  {path: "addStudent", component: AddEtudiantComponent},
  {path: "updateStudent", component: UpdateEtudiantComponent},
  {path: "deleteStudent", component: DeleteStudentComponent},
  {path: "listSports", component: ListNoteComponent}
  // {path: '**', redirectTo: '/listStudents'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
