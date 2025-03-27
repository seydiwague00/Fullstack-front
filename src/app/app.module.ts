import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavBarComponent} from './nav-bar/nav-bar.component';
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
import {MatDialogActions, MatDialogContent} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddEtudiantComponent,
    ListEtudiantComponent,
    UpdateEtudiantComponent,
    DeleteStudentComponent,
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
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
