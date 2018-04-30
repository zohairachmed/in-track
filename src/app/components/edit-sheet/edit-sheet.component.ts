

import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
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
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';



@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.css']
})
export class EditSheetComponent implements OnInit {
  @ViewChild('hotTable') hot
  messages: string[] = [];
  tempData:any[]=[];
  dataset: dataStuct[];
  fetched = false;
  error = false;
  sub: any;
  id: string;
  saveMessages: string[] = [];
  sheetData: any[] = [];
  sheetDate: Date;
  sheetName: string;
  sheetNotes: string;
  active: boolean;
  jsonData: any;
  step = 0;
  dataRaw:any;
  removable: boolean = true;
  

  constructor( public toastr: ToastsManager,public dialog: MatDialog, vcr: ViewContainerRef,private _editsheetservice: editSheetService, private activatedRoute: ActivatedRoute) {
    
    this.toastr.setRootViewContainerRef(vcr);
    
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('sheetId');
    this.fetchData();
    console.log(this.dataset);
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
    // this.dataRaw = [];
    // this.dataset = [];
    this.dataRaw = this._editsheetservice.editSheetRaw(this.id);    
    console.log(this.dataRaw);       
    this.dataset = this._editsheetservice.editSheetHandsOnTable(this.id);  
    
      
  setTimeout(() => {
   this.sheetName = this.dataRaw[0].sheetName;
    this.sheetNotes = this.dataRaw[0].sheetNotes;
    this.sheetDate = this.dataRaw[0].sheetDate;
    this.active = this.dataRaw[0].active;
    }, 500);
   


    // .subscribe(
    //   dataStucts => this.dataset = dataStucts,
    //   err => this.error = true,
    //   () => this.fetched = true);
  }
  // saveData(users): void {
  //   this._editsheetservice.saveSheet(users)
  //     .subscribe(
  //       messages => {
  //         Observable.of('Request Complete!').delay(2500)
  //                   .subscribe(() => {
  //                     this.saveMessages.splice(0, 0, ...messages);
  //                   });
  //       });
  // }

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
        // alert(newVal + prop + row);
        var data = { [prop]:newVal, "rowId": row }
        this.sheetData.push(data)
        //console.log(this.sheetData);
        
        //await this._editsheetservice.saveSheet(data);
      }
      else {
        // alert(newVal + prop + uid); 
        var data = { [prop]:newVal, "rowId": row }
        this.sheetData.push(data);
        //console.log(this.sheetData);        
        
        // console.log(Object.keys(data))
        // console.log(Object.values(data))
       
        
        //await this._editsheetservice.saveSheet(data);
      }



    })
  }
  PostHandsondata() {
    var data = this.sheetData;

    

    setTimeout(() => {

    
      // console.log(array);console.log(this.data);console.log(this.hot.hotInstance)
      if (data.length < 1) {
        this.toastr.error('Empty Data set', 'Required', { positionClass: 'toast-bottom-right' });
        const dialogRef = this.dialog.open(OnemptyComponent);
        dialogRef.afterClosed().subscribe(result => {
        });
      } else {        
        this.jsonData = {
          sheetId: this.id,
          sheetName: this.sheetName,
          sheetDate: this.sheetDate,
          data: data,
          sheetNotes: this.sheetNotes,
          active: this.active,
          updated: new Date(new Date().setDate(new Date().getDate() + 0)),
          updatedBy: 'zaid',         
        };
        //console.log(this.jsonData);
        if(this.jsonData.sheetId !== null && this.jsonData.sheetName !== null ){
          this._editsheetservice.updateSheet(this.jsonData);
          this.toastr.success('Sheet Added', '', { positionClass: 'toast-bottom-right' });
          data = [];  
          this.sheetData = [];     
          this.jsonData = [];
         this.sheetName = "";
          this.sheetNotes = "";
          this.sheetDate = new Date(new Date().setDate(new Date().getDate() + 0));
          
  
        }
       
        //   //this.hot.hotInstance.loadData([]);
        //  // this.hot.hotInstance.render();
        //   setTimeout(() => {
        //     this.router.navigate(['/ViewSheet']);
        //   }, 1000); 
      }
    }, 1000);
  }



}
