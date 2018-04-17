import { Component, OnInit,ViewChild, Renderer2,ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
// import {Todo} from '../to-do/to-do';
// import { TodoService } from '../to-do/to-do.service';
import { CheckType } from '@angular/core/src/view';
import {ViewSheetServices} from './view-sheets.service';
import { ViewSheetsElement } from './view-sheets';
import {FormControl, Validators} from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {MatDialog, MatPaginator,MatSort} from '@angular/material';
import {DeleteDialogComponent} from '../../dialogs/delete/delete.dialog.component';
// import {DataService} from '../../services/data.service';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {SelectionModel} from '@angular/cdk/collections'
import {EditDialogComponent} from '../../dialogs/edit/edit.dialog.component';

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
  formGroup: FormGroup;
  DataSources: any; 
  saveMode: SaveMode = SaveMode.None;
  headerText: string;
  Arrayextra:any; 
  Date: Date;
  SheetName: string;
  Notes: string;
  Ongoing: boolean;
  rend: Renderer2;
  id: string;
  ViewSheetDatabase = new ViewSheetServices();// = new ViewSheetDatabase();
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSourceNew | null;
  @ViewChild('table') table
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  constructor(private _viewsheetsService:ViewSheetServices, private _formBuilder: FormBuilder,  public renderer: Renderer2, public dialog: MatDialog) {
    this.formGroup = _formBuilder.group({
      'Id':'',
      'SheetName': '',
      'Notes': '',
      'Date': '',
      'Ongoing': ''});
      this.rend = renderer;
      
  }
  formControl = new FormControl('', [
    
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
   
    return this.formControl.hasError('required') ? 'Required field' :
      // this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  // showEditForm(ViewSheetsElement: ViewSheetsElement[]){

  // }
  ngOnInit() {
    // this.getTodos();
    this.loadData();  
    
  }
  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }
  
    if (this.filter.nativeElement.value) {
   
      return this.selection.selected.length == this.dataSource.renderedData.length;
      
    } else {
    
      return this.selection.selected.length == this.ViewSheetDatabase.data.length;
    }
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.Id));
    } else {
      this.ViewSheetDatabase.data.forEach(data => this.selection.select(data.Id));
    }
  }

  public loadData() {
    this.dataSource = new ExampleDataSourceNew(this.ViewSheetDatabase, this.paginator, this.sort);
  
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
        
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        
      });
      
  }
  
  getTodos() {
    return this._viewsheetsService.getTodosFromData();

  }

  saveUpdateTodo(ViewSheetsElement: ViewSheetsElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {Date: new Date(new Date().setDate(new Date().getDate() + 0)),Id: ViewSheetsElement.Id, Notes: ViewSheetsElement.Notes,  Ongoing: ViewSheetsElement.Ongoing, SheetName: ViewSheetsElement.SheetName}
    });

    dialogRef.afterClosed().subscribe(result => { 
         if(result !== ''){
      this.loadData();  
         }
         alert(result);
    });
  }

  removeToDo(ViewSheetsElement: ViewSheetsElement) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:{Date: ViewSheetsElement.Date,Id: ViewSheetsElement.Id, Notes: ViewSheetsElement.Notes,  Ongoing: ViewSheetsElement.Ongoing, SheetName: ViewSheetsElement.SheetName }
      
    }); 
    dialogRef.afterClosed().subscribe(result => {
     
      if(result !== ''){
        this.loadData();  
           }
           alert(result);
      });
  }
  
  cancelEditTodo() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  // showEditForm(ViewSheetsElement, Handsonform) {
  //   if (!ViewSheetsElement) {
  //     return;
  //   }
  //    //this.rend.setStyle(tableContain, 'display', 'none');
  //    this.rend.setStyle(Handsonform, 'display', 'block');
  //   //this.saveMode = SaveMode.Edit;
  //   //this.headerText = 'Edit To-Do';
  //    const editedTodo = Object.assign({}, ViewSheetsElement, { Date: this.applyLocale(ViewSheetsElement.Date) });     
  //     this.formGroup.setValue(editedTodo);
    
  // }

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


export class ExampleDataSourceNew extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: ViewSheetsElement[] = [];
  renderedData: ViewSheetsElement[] = [];

  constructor(private _exampleDatabase: ViewSheetServices,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();    
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ViewSheetsElement[]> {
  
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange, 
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: ViewSheetsElement) => {
        let searchStr = (item.Id + item.SheetName + item.Notes +item.Date).toLowerCase();
      
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());
  
      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);    
      return this.renderedData;
      
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: ViewSheetsElement[]): ViewSheetsElement[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string|Date|boolean = '';
      let propertyB: number|string|Date|boolean  = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.Id, b.Id]; break;
        case 'SheetName': [propertyA, propertyB] = [a.SheetName, b.SheetName]; break;
        case 'Notes': [propertyA, propertyB] = [a.Notes, b.Notes]; break;
        case 'Date': [propertyA, propertyB] = [a.Date, b.Date]; break;
        case 'Ongoing': [propertyA, propertyB] = [a.Ongoing, b.Ongoing]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}


  



 


  
  
  
