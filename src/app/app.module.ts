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
import { EditSheetComponent } from './components/edit-sheet/edit-sheet.component';
import { editSheetService } from './components/edit-sheet/edit-sheet.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
// import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ChartsModule } from 'ng2-charts';
import { ViewonlySheetsComponent } from './components/viewonly-sheets/viewonly-sheets.component';

//import { LoginComponent } from './login/index';
//import { RegisterComponent } from './register/index';
//import { AuthGuard } from './_guards/index';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

//import { AppComponent }  from './app.component';
//import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
//import { HomeComponent } from './home/index';
//import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {
          MatProgressSpinnerModule,
          MatSidenavModule,
          MatButtonModule,
          MatTableModule,
          MatCardModule,
          MatListModule          
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
          MatProgressBarModule,
          MatSortModule,
          MatChipsModule,
          MatDividerModule
} from '@angular/material';

var appRoutes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  { path: 'ViewSheet', component: ViewSheetsComponent, canActivate: [AuthGuard] },
  { path: 'AddSheet', component: AddSheetComponent, canActivate: [AuthGuard] },
  { path: 'EditSheet', component: EditSheetComponent, canActivate: [AuthGuard] },
  { path: 'ViewOnlySheet', component: ViewonlySheetsComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
{ path: '**', redirectTo: '' }
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
    LoginComponent,
    ViewonlySheetsComponent,
    AlertComponent,        
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
    HotTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
            MatProgressSpinnerModule,
            MatButtonModule,
            MatPaginatorModule,
            MatSortModule,
            MatToolbarModule,
            MatIconModule,
            MatTableModule,
            MatListModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatSelectModule,
            MatOptionModule,
            MatInputModule,
            MatCardModule,
            MatDialogModule,
            MatCheckboxModule,
            MatSidenavModule,
            MatProgressBarModule,
            MatChipsModule,
            MatDividerModule


  ],
  exports: [

  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    OnemptyComponent

  ],
  providers: [TodoService, ViewSheetServices, AddSheetServices, editSheetService, AuthService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

    // provider used to create fake backend
fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
