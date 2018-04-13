import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule,MatTableModule,MatCardModule, MatToolbarModule,MatFormFieldModule,MatInputModule, MatOptionModule, MatIconModule,MatCheckboxModule,MatSelectModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { TodoService } from './components/to-do/to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSheetComponent } from './components/add-sheet/add-sheet.component';
import { ViewSheetsComponent } from './components/view-sheets/view-sheets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { ViewSheetServices } from './components/view-sheets/view-sheets.service';
import { HotTableModule } from '@handsontable/angular';
import { AddSheetServices } from './components/add-sheet/add-sheet.service';



var appRoutes: Routes =[
  {path:'', component:ToDoComponent},
  {path:'ViewSheet',component:ViewSheetsComponent},
  {path:'AddSheet', component:AddSheetComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    AddSheetComponent,
    ViewSheetsComponent
   
    
    

  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,    
    ReactiveFormsModule,
       MatButtonModule,       
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
  providers: [TodoService, ViewSheetServices,AddSheetServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
