import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
// import {Todo} from '../to-do/to-do';
// import { TodoService } from '../to-do/to-do.service';
import { CheckType } from '@angular/core/src/view';
import {ViewSheetServices} from './view-sheets.service';
import { ViewSheetsElement } from './view-sheets';





export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-view-sheets',
  templateUrl: './view-sheets.component.html',
  styleUrls: ['./view-sheets.component.css']
})
export class ViewSheetsComponent implements OnInit {
  displayedColumns = ['Id', 'SheetName', 'Date', 'Notes', 'Ongoing', 'Buttons'];
  dataSource: ViewSheetsElement[];
  formGroup: FormGroup;
  DataSources: any; 
  saveMode: SaveMode = SaveMode.None;
  headerText: string;
  Arrayextra:any; 
 

  constructor(private _viewsheetsService:ViewSheetServices, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'name': '',
      'due': '',
      'done': '',
      'notes': ''});
      
  }
  
  
  ngOnInit() {
    this.getTodos();
  }
  
  getTodos() {
    this.dataSource = this._viewsheetsService.getTodosFromData();
  }

  saveTodo(ViewSheetsElement: ViewSheetsElement) {
    if (ViewSheetsElement.Id) {
      this._viewsheetsService.updateTodo(ViewSheetsElement);
    } else {
      this._viewsheetsService.addTodo(ViewSheetsElement);
    }
    this.saveMode = SaveMode.None;
  }

  removeToDo(ViewSheetsElement: ViewSheetsElement) {
    this._viewsheetsService.deleteTodo(ViewSheetsElement);
    
    
  }

  cancelEditTodo() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(ViewSheetsElement: ViewSheetsElement) {
    if (!ViewSheetsElement) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit To-Do';
    const editedTodo = Object.assign({}, ViewSheetsElement, { due: this.applyLocale(ViewSheetsElement.Date) });
    this.formGroup.setValue(editedTodo);
  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New To-Do';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }

  applyLocale(Date) {
    return new DatePipe(navigator.language).transform(Date, 'y-MM-dd');
  }
}

  
  
  
