import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEtudiantComponent} from './components/list-etudiant/list-etudiant.component';
import {AddEtudiantComponent} from './components/add-etudiant/add-etudiant.component';
import {UpdateEtudiantComponent} from './components/update-etudiant/update-etudiant.component';
import {DeleteStudentComponent} from './components/delete-student/delete-student.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './nav-bar/admin.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  // {path: '', redirectTo: '/listStudents', pathMatch: 'full'},
  {
    path: "admin", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {path: "listStudents", component: ListEtudiantComponent},
      {path: "addStudent", component: AddEtudiantComponent},
      {path: "updateStudent", component: UpdateEtudiantComponent},
      {path: "deleteStudent", component: DeleteStudentComponent},
    ]
  },

  // {path: '**', redirectTo: '/listStudents'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
