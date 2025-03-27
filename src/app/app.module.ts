import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AdminComponent} from './admin/admin.component';
import {MatListItem, MatNavList} from '@angular/material/list';
import {AddEtudiantComponent} from './components/add-etudiant/add-etudiant.component';
import {ListEtudiantComponent} from './components/list-etudiant/list-etudiant.component';
import {UpdateEtudiantComponent} from './components/update-etudiant/update-etudiant.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortHeader, MatSortModule} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DeleteStudentComponent} from './components/delete-student/delete-student.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {AppHttpInterceptor} from './interceptors/app-http.interceptor';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddEtudiantComponent,
    ListEtudiantComponent,
    UpdateEtudiantComponent,
    DeleteStudentComponent,
    LoginComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSidenavContainer,
    MatToolbarModule,
    MatIconModule,
    MatListItem,
    MatNavList,
    MatIconButton,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortHeader,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
