import { HotTableModule } from '@handsontable/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { CommonModule } from '@angular/common';
import { TodoService } from './components/to-do/to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSheetComponent } from './components/add-sheet/add-sheet.component';
import { ViewSheetsComponent } from './components/view-sheets/view-sheets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ViewSheetServices } from './components/view-sheets/view-sheets.service';
// import { HotTableModule } from '@handsontable/angular';
import { AddSheetServices } from './components/add-sheet/add-sheet.service';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { OnemptyComponent } from './dialogs/onempty/onempty.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {
  MatSidenavModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule
  , MatToolbarModule
  , MatFormFieldModule
  , MatInputModule
  , MatDialogModule
  , MatOptionModule
  , MatIconModule
  , MatCheckboxModule
  , MatSelectModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSortModule
} from '@angular/material';
import { EditSheetComponent } from './components/edit-sheet/edit-sheet.component';
import { editSheetService } from './components/edit-sheet/edit-sheet.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';


var appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'ViewSheet', component: ViewSheetsComponent, canActivate: [AuthGuard] },
  { path: 'AddSheet', component: AddSheetComponent, canActivate: [AuthGuard] },
  { path: 'EditSheet', component: EditSheetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AddDialogComponent,
    EditDialogComponent,
    AppComponent,
    ToDoComponent,
    AddSheetComponent,
    ViewSheetsComponent,
    DeleteDialogComponent,
    OnemptyComponent,
    EditSheetComponent,
    HomeComponent,
    LoginComponent





  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    HotTableModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule


  ],
  exports: [

  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    OnemptyComponent

  ],
  providers: [TodoService, ViewSheetServices, AddSheetServices, editSheetService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
