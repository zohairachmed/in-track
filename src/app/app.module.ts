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
import { OnemptyComponent } from './dialogs/onempty/onempty.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
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
  MatExpansionModule,
  MatSortModule } from '@angular/material';
import { EditSheetComponent } from './components/edit-sheet/edit-sheet.component';
import { editSheetService } from './components/edit-sheet/edit-sheet.service';









var appRoutes: Routes =[
  {path:'', component:ToDoComponent},
  {path:'ViewSheet',component:ViewSheetsComponent},
  {path:'AddSheet', component:AddSheetComponent},
  {path:'EditSheet', component:EditSheetComponent}
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
    EditSheetComponent
    
    
    
    

  ],
  imports: [
    BrowserModule,    
    FormsModule,  
    RouterModule.forRoot(appRoutes),  
    ToastModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
         MatButtonModule, 
         MatPaginatorModule,
         MatSortModule ,      
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
         MatCheckboxModule
       
       
  ],
  exports:[
    
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    OnemptyComponent
    
  ],
  providers: [TodoService, ViewSheetServices,AddSheetServices,editSheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
