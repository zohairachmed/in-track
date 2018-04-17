import {HotTableModule} from '@handsontable/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { TodoService } from './components/to-do/to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSheetComponent } from './components/add-sheet/add-sheet.component';
import { ViewSheetsComponent } from './components/view-sheets/view-sheets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { ViewSheetServices } from './components/view-sheets/view-sheets.service';
// import { HotTableModule } from '@handsontable/angular';
import { AddSheetServices } from './components/add-sheet/add-sheet.service';
import{ DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
// import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule,
  MatTableModule, 
  MatCardModule
  , MatToolbarModule
  ,MatFormFieldModule
  ,MatInputModule
  ,MatDialogModule
  , MatOptionModule
  , MatIconModule
  ,MatCheckboxModule
  ,MatSelectModule,
  MatPaginatorModule,
  MatSortModule } from '@angular/material';






var appRoutes: Routes =[
  {path:'', component:ToDoComponent},
  {path:'ViewSheet',component:ViewSheetsComponent},
  {path:'AddSheet', component:AddSheetComponent}
  ];

@NgModule({
  declarations: [
    EditDialogComponent,
    AppComponent,
    ToDoComponent,    
    AddSheetComponent,
    ViewSheetsComponent,
    DeleteDialogComponent
    
    

  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,   
    MatDialogModule,
    ReactiveFormsModule,
       MatButtonModule, 
       MatPaginatorModule,
  MatSortModule ,      
       BrowserAnimationsModule,
       MatToolbarModule,
       MatIconModule,
       MatTableModule,
       MatFormFieldModule,
       MatSelectModule,
       MatOptionModule,
       MatInputModule,
       HotTableModule,
       
       RouterModule.forRoot(appRoutes)
  ],
  exports:[
    
  ],
  entryComponents: [
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [TodoService, ViewSheetServices,AddSheetServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
