import { Component, OnInit, ViewChild, Renderer2, ElementRef, ViewContainerRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckType } from '@angular/core/src/view';
import { ViewSheetServices } from './view-sheets.service';
import { ViewSheetsElement } from './view-sheets';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MatDialog, MatPaginator, MatSort, DateAdapter, MatTableDataSource } from '@angular/material';
import { DeleteDialogComponent } from '../../dialogs/delete/delete.dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { SelectionModel } from '@angular/cdk/collections'
import { EditDialogComponent } from '../../dialogs/edit/edit.dialog.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


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


export class ViewSheetsComponent implements OnInit, OnDestroy {
  displayedColumns = ['sheetName', 'sheetDate', 'sheetNotes', 'active', 'updatedBy', 'createdBy', 'created', 'updated', 'Buttons', 'viewOnlySheets'];//, 'editSheets'];
  sheetDate: Date;
  sheetName: string;
  sheetNotes: string;
  active: boolean;
  rend: Renderer2;
  sheetId: string;
  dataSource: ExampleDataSourceNew | null;
  private alive: boolean = true;
  isLoadingResults = true;

  @ViewChild('table') table
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private ref: ChangeDetectorRef, private router: Router, private _viewsheetsService: ViewSheetServices, private _formBuilder: FormBuilder, public renderer: Renderer2, public dialog: MatDialog, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.rend = renderer;
    this.toastr.setRootViewContainerRef(vcr);
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

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
    setTimeout(() => {
      this.isLoadingResults = false;
    }, 2000);


  }
  ngOnDestroy() {
    this.alive = false;
  }


  public loadData() {
    //this.ViewSheetDatabase = new ViewSheetServices();

    this.dataSource = new ExampleDataSourceNew(this._viewsheetsService, this.paginator, this.sort);

    this.toastr.success('Grid Refreshed', '', {
      positionClass: 'toast-bottom-right', toastLife: 800
    });

    this.dataSource.filteredData.length = this.dataSource.data.length;
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged().takeWhile(() => this.alive)
      .subscribe(() => {



        if (!this.dataSource) {

          return;

        }
        this.dataSource.filter = this.filter.nativeElement.value;

      });
  }

  sheetView(sheetId: string) {
    this.router.navigate(['/ViewOnlySheet', { sheetId: sheetId }]);
  }
  removeToDo(ViewSheetsElement: ViewSheetsElement) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { updatedBy: ViewSheetsElement.updatedBy, created: ViewSheetsElement.created, updated: ViewSheetsElement.updated, createdBy: ViewSheetsElement.createdBy, sheetDate: ViewSheetsElement.sheetDate, sheetId: ViewSheetsElement.sheetId, sheetNotes: ViewSheetsElement.sheetNotes, active: ViewSheetsElement.active, sheetName: ViewSheetsElement.sheetName }

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        this.loadData();
      }

    })
  }
  SheetEdit(sheetId: string) {
    this.router.navigate(['/EditSheet', { sheetId: sheetId }]);
    //console.log(Id);
  }

}


export class ExampleDataSourceNew extends DataSource<ViewSheetsElement> {
  _filterChange = new BehaviorSubject('');
  pItems: ViewSheetsElement[] = []; //= ELEMENT_DATA;
  interval: Subscription;
  dataLength: any;
  dataChange: BehaviorSubject<ViewSheetsElement[]> = new BehaviorSubject<ViewSheetsElement[]>([]);
  get data(): ViewSheetsElement[] {

    return this.dataChange.value;
  }
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

    this.interval = this._exampleDatabase.getAllItems().subscribe(result => {

      this.dataLength = result;
      for (var i = 0; i < this.dataLength.length; i++) {
        this.pItems.push(result[i]);
      }
      this.dataChange.next(this.pItems);


    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];


    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.data.slice().filter((item: ViewSheetsElement) => {
        let searchStr = (item.sheetId + item.sheetName + item.sheetNotes + item.sheetDate).toLowerCase();
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


  disconnect() {
    this.interval.unsubscribe()
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: ViewSheetsElement[]): ViewSheetsElement[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string | Date | boolean = '';
      let propertyB: number | string | Date | boolean = '';

      switch (this._sort.active) {
        case 'sheetId': [propertyA, propertyB] = [a.sheetId, b.sheetId]; break;
        case 'sheetName': [propertyA, propertyB] = [a.sheetName, b.sheetName]; break;
        case 'sheetNotes': [propertyA, propertyB] = [a.sheetNotes, b.sheetNotes]; break;
        case 'sheetDate': [propertyA, propertyB] = [a.sheetDate, b.sheetDate]; break;
        case 'sheetactive': [propertyA, propertyB] = [a.active, b.active]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}












