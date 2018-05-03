import { Component, OnInit, Renderer2, ChangeDetectorRef, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import * as Handsontable from 'handsontable';
import { MatDialog } from '@angular/material';
import { AddSheetServices } from './add-sheet.service';
import { dataStuct, HandsondataInt } from './add-sheet';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { HotTableModule } from '@handsontable/angular';
import { HotTableRegisterer } from '@handsontable/angular';
import { FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { OnemptyComponent } from '../../dialogs/onempty/onempty.component';
import { ToastsManager } from 'ng2-toastr';
import { ViewSheetServices } from '../view-sheets/view-sheets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.css']

})
export class AddSheetComponent implements OnInit, OnDestroy {
  @ViewChild('hotTable') hot
  data: any;//dataStuct[];
  rend: Renderer2;
  sheetDate: Date;
  sheetName: string;
  sheetNotes: string;
  active: boolean;
  JsonData: any;
  step = 0;
  router: Router;
  error = false;
  isLoadingResults = true;
  private alive: boolean = true;


  constructor(private _AddSheetServices: AddSheetServices, public renderer: Renderer2, public dialog: MatDialog,
    private refs: ChangeDetectorRef, private routers: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.data = []// _AddSheetServices.getTodosFromData();
    this.rend = renderer;
    this.router = routers;
    this.sheetDate = new Date(new Date().setDate(new Date().getDate() + 0));
    this.toastr.setRootViewContainerRef(vcr);


  }
  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    this.isLoadingResults = false;
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

  }

  prevStep() {
    this.step--;
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

  render(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);

    if (value < 8 && value !== null) {
      td.style.backgroundColor = "red";

    }
  }
  createRowId(): Observable<any> {
    var dataFromRowId: any = [];
    for (let index = 0; index < this.hot.hotInstance.getData().length; index++) {
      if (this.hot.hotInstance.getDataAtRow(index)[2]) {
        this.data[index].Handsondata.rowId = index;
        dataFromRowId.push(this.data[index].Handsondata);
      }

    }

    return dataFromRowId;
  }
  fromFunction$(factory: () => any) {
    return Observable.create((observer) => {
      try {
        observer.next(this.createRowId());
        observer.complete();
      } catch (error) {
        this.toastr.error('Error occurred. Details: ' + error + ' ' + error, '', {
          positionClass: 'toast-bottom-right', toastLife: 800
        });
        observer.error(error);
      }
    });
  }
  PostHandsondata() {
    this.isLoadingResults = true;
    setTimeout(() => {


      var data: any[] = [];
      var length = this.hot.hotInstance.getData().length;
      this.fromFunction$(() => 0).subscribe((value) => {
        data = value;

        if (data.length < 1) {
          this.toastr.error('Empty Data set', 'Required', {
            positionClass: 'toast-bottom-right', toastLife: 800
          });
          this.isLoadingResults = false;
          const dialogRef = this.dialog.open(OnemptyComponent);
          dialogRef.afterClosed().subscribe(result => {
          });
        } else {

          let uuid = UUID.UUID();
          this.JsonData = {
            sheetId: uuid,
            sheetName: this.sheetName,
            sheetDate: this.sheetDate,
            data: data,
            sheetNotes: this.sheetNotes,
            active: this.active,
            created: this.sheetDate,
            createdBy: 'ziad'
          };

          this._AddSheetServices.addTodo(this.JsonData).takeWhile(() => this.alive).subscribe(datas => {
            this.toastr.success('Sheet Added', '', {
              positionClass: 'toast-bottom-right', toastLife: 800
            });
            this.isLoadingResults = false;
          },
            (err: HttpErrorResponse) => {
              this.error = true;
              this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {
                positionClass: 'toast-bottom-right', toastLife: 800
              });
              this.isLoadingResults = false;
            });


          data = [];
          for (let index = 0; index < this.hot.hotInstance.getData().length; index++) {
            this.data[index].Handsondata = [];
          }
          this.JsonData = [];
          this.sheetName = "";
          this.sheetNotes = "";
          this.sheetDate = new Date(new Date().setDate(new Date().getDate() + 0));


        }

      },
        (err: HttpErrorResponse) => {
          this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {
            positionClass: 'toast-bottom-right', toastLife: 800
          });
          this.isLoadingResults = false;
        });

    }, 300);

  }

  ShowHandsontable(SheetInput, DateInput, NotesInput, OngoingInput, HandsonTable, Handsonform) {
    // this.rend.setValue(SheetTitle,SheetInput)
    this.sheetName = SheetInput;
    this.sheetNotes = NotesInput;
    this.sheetDate = new Date(new Date().setDate(new Date().getDate() + 0));
    this.active = OngoingInput;
    // this.rend.setStyle(Handsonform, 'display', 'none');
    // this.rend.setStyle(HandsonTable, 'display', 'block');

  }
}
