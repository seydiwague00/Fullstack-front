import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEtudiantComponent} from './components/list-etudiant/list-etudiant.component';
import {AddEtudiantComponent} from './components/add-etudiant/add-etudiant.component';
import {UpdateEtudiantComponent} from './components/update-etudiant/update-etudiant.component';

const routes: Routes = [
  { path: '', component: ListEtudiantComponent },
  {path: "listStudents", component: ListEtudiantComponent},
  {path: "addStudent", component: AddEtudiantComponent},
  {path: "updateStudent", component: UpdateEtudiantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
