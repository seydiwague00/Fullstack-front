import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatListItem, MatNavList} from '@angular/material/list';
import { AddEtudiantComponent } from './components/add-etudiant/add-etudiant.component';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';
import { UpdateEtudiantComponent } from './components/update-etudiant/update-etudiant.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    NavBarComponent,
    AddEtudiantComponent,
    ListEtudiantComponent,
    UpdateEtudiantComponent
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
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
