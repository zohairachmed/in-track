

import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { editSheetService } from './edit-sheet.service';
import { dataStuct, HandsondataInt } from './edit-sheet';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import * as Handsontable from 'handsontable';
import { dataStucts } from '../../../api/add-sheet-handsontable-data';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { OnemptyComponent } from '../../dialogs/onempty/onempty.component';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.css']
})
export class EditSheetComponent implements OnInit, OnDestroy {
  @ViewChild('hotTable') hot
  dataset: any[] = [];
  error = false;
  id: string;
  sheetData: any[] = [];
  sheetDate: Date;
  sheetName: string;
  sheetNotes: string;
  active: boolean;
  jsonData: any;
  step = 0;
  dataRaw: any[] = [];
  private alive: boolean = true;

  constructor(public toastr: ToastsManager, public dialog: MatDialog, vcr: ViewContainerRef, private _editsheetservice: editSheetService, private activatedRoute: ActivatedRoute) {

    this.toastr.setRootViewContainerRef(vcr);

  }
  ngOnDestroy() {
    this.alive = false;
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('sheetId');
    this.fetchData();
    //console.log(this.dataset);
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
  fetchData(): void {
    this._editsheetservice.editSheetRaw(this.id).takeWhile(() => this.alive).subscribe(datas => {
      JSON.stringify(datas);

      this.dataRaw.push(datas);
      this.toastr.success('Data loaded', '', {
        positionClass: 'toast-bottom-right', toastLife: 800
      });
      this.sheetName = this.dataRaw[0].sheetName;
      this.sheetNotes = this.dataRaw[0].sheetNotes;
      this.sheetDate = this.dataRaw[0].sheetDate;
      this.active = this.dataRaw[0].active;
    },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {
          positionClass: 'toast-bottom-right', toastLife: 800
        });
      });

    this._editsheetservice.editSheetHandsOnTable(this.id).takeWhile(() => this.alive).subscribe(datas => {
      JSON.stringify(datas);

      if (datas["data"].length < 1) {
        this.dataset.push({ "rowId": 0 });
      } else {
        for (var i = 0; i < datas["data"].length; i++) {
          this.dataset.push(datas["data"][i]);
        }
      }
      this.toastr.success('Sheet loaded', '', {
        positionClass: 'toast-bottom-right', toastLife: 800
      });
    },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {
          positionClass: 'toast-bottom-right', toastLife: 800
        });
      });


  }


  async onAfterChange($event, event: MatChipInputEvent) {
    if (!$event.params[0]) {
      return;
    }

    const hotInstance = $event.hotInstance;
    const changes = $event.params[0];

    changes.forEach(async change => {
      const [row, prop, oldVal, newVal] = change;

      if (oldVal === newVal) {
        return;
      }

      if (prop === 'rowId') {
        return;
      }

      const uid = hotInstance.getDataAtCell(row, 'rowId');
      if (uid == null || uid == undefined || uid == '') {
        var number = hotInstance.getDataAtProp('rowId');
        for (var j = 0; j < number.length; ++j) {
          if (number[j] == null) {
            hotInstance.setDataAtCell(j, 0, j);
          }
        }

        var data = { [prop]: newVal, "rowId": row }
        this.sheetData.push(data)

      }
      else {

        var data = { [prop]: newVal, "rowId": row }
        this.sheetData.push(data);

      }



    })
  }
  PostHandsondata() {
    var data = this.sheetData;
    if (data.length < 1) {
      this.toastr.warning('Nothing changed in sheet', '', {
        positionClass: 'toast-bottom-right', toastLife: 800
      });
    }
    this.jsonData = {
      sheetId: this.id,
      sheetName: this.sheetName,
      sheetDate: this.sheetDate,
      data: data,
      sheetNotes: this.sheetNotes,
      active: this.active,
      updated: new Date(new Date().setDate(new Date().getDate() + 0)),
      updatedBy: 'zaid',
    }
    if (this.jsonData.sheetId !== null && this.jsonData.sheetName !== null) {
      this._editsheetservice.updateSheet(this.jsonData).takeWhile(() => this.alive).subscribe(datas => {
        this.toastr.success('Sheet Added', '', {
          positionClass: 'toast-bottom-right', toastLife: 800
        });
      },
        (err: HttpErrorResponse) => {
          this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {
            positionClass: 'toast-bottom-right', toastLife: 800
          });
          this.error = true;
        });
          
      data = [];
      this.sheetData = [];
      this.jsonData = [];
      this.sheetName = "";
      this.sheetNotes = "";
      this.sheetDate = new Date(new Date().setDate(new Date().getDate() + 0));


    }

  }

}
