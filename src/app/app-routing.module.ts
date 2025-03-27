import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEtudiantComponent} from './components/list-etudiant/list-etudiant.component';
import {AddEtudiantComponent} from './components/add-etudiant/add-etudiant.component';
import {UpdateEtudiantComponent} from './components/update-etudiant/update-etudiant.component';
import {DeleteStudentComponent} from './components/delete-student/delete-student.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {AuthorizationGuard} from './guards/authorization.guard';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  // {path: '', redirectTo: '/listStudents', pathMatch: 'full'},
  {
    path: "admin", component: AdminComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: "listStudents", component: ListEtudiantComponent},
      {path: "addStudent", component: AddEtudiantComponent, canActivate: [AuthorizationGuard], data: {role: "ADMIN"}},
      {
        path: "updateStudent",
        component: UpdateEtudiantComponent,
        canActivate: [AuthorizationGuard],
        data: {role: "ADMIN"}
      },
      {
        path: "deleteStudent",
        component: DeleteStudentComponent,
        canActivate: [AuthorizationGuard],
        data: {role: "ADMIN"}
      },
      {
        path: "notAuthorized",
        component: NotAuthorizedComponent,
      },
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
