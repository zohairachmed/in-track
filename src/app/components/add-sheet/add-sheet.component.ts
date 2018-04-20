
import { Component, OnInit, Renderer2, ChangeDetectorRef, ViewChild, ViewContainerRef } from '@angular/core';
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


@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.css']

})
export class AddSheetComponent implements OnInit {
  @ViewChild('hotTable') hot
  data: any;//dataStuct[];
  rend: Renderer2;
  Date: Date;
  SheetTitle: string;
  Notes: string;
  Ongoing: boolean;
  JsonData: dataStuct[];
  step = 0;
  router: Router;



  // settingsObj: Handsontable.GridSettings = {
  // colHeaders: ["Title", "Description", "Comments", "Cover"],
  //   columns: [
  //     {data: "title", renderer: "html"},
  //     {data: "description", renderer: "html"},
  //     {data: "comments", renderer: "html"},
  //     {data: "cover", renderer: "html"}
  //   ],
  //   rowHeaders: true
  // }

  constructor(private _AddSheetServices: AddSheetServices, public renderer: Renderer2, public dialog: MatDialog,
    private refs: ChangeDetectorRef, private routers: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.data = []// _AddSheetServices.getTodosFromData();
    this.rend = renderer;
    this.router = routers;
    this.Date = new Date(new Date().setDate(new Date().getDate() + 0));
    this.toastr.setRootViewContainerRef(vcr);
   
  }

  ngOnInit() {
    //console.log (this.data);

  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
     
  // get the count of the rows in the table
      // get the count of the columns in the table.
     
    for(var rowing=0; rowing<this.hot.hotInstance.countRows(); rowing++){  // go through each row of the table
          // go through each column of the row
            var cell = this.hot.hotInstance.getCell(rowing,0); 
            console.log(cell); 
            cell.style.background = "#D3D3D3";
            
    }

    
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

  

  
  



  PostHandsondata() {
    

    var array: any[] = [];
    var length = this.hot.hotInstance.getData().length;
     for(var i=0;i<length;i++){
      this.hot.hotInstance.setDataAtCell(i, 0, i)
     }
    //console.log(this.hot.hotInstance.getData().length);
    this.toastr.success('Sheet Added', '', { positionClass: 'toast-bottom-right' });
    
    setTimeout(() => {      
   
    for (let index = 0; index < this.hot.hotInstance.getData().length; index++) {
      if (this.hot.hotInstance.getDataAtRow(index)[1]) {          
        array.push(this.data[index].Handsondata);
        
      }
    };
   // console.log(array);console.log(this.data);console.log(this.hot.hotInstance)
    if (array.length < 1) {
      this.toastr.error('Empty Data set', 'Required', { positionClass: 'toast-bottom-right' });
      const dialogRef = this.dialog.open(OnemptyComponent);
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      let uuid = UUID.UUID();
      this.JsonData = [{
        
        Id: uuid,
        SheetName: this.SheetTitle,
        Date: this.Date,
        Handsondata: array,
        Notes: this.Notes,
        Ongoing: this.Ongoing,
        LastupdatedBy:'ziad',
        createdBy:'Ziad',
        LastUpdateDate:this.Date
      }];
     this._AddSheetServices.addTodo(this.JsonData);
      
      array = [];

     for (let index = 0; index < this.hot.hotInstance.getData().length; index++) {
       this.data[index].Handsondata = [];
     }
     this.JsonData = [];
     this.SheetTitle = "";
    this.Notes = "";
    this.Date = new Date(new Date().setDate(new Date().getDate() + 0));
    
   
      //   //this.hot.hotInstance.loadData([]);
      //  // this.hot.hotInstance.render();
      //   setTimeout(() => {
      //     this.router.navigate(['/ViewSheet']);
      //   }, 1000); 



    }
  }, 1000);
  }
  

  // detectChanges(){
  //   this.refs.markForCheck();
  // }
  ShowHandsontable(SheetInput, DateInput, NotesInput, OngoingInput, HandsonTable, Handsonform) {
    // this.rend.setValue(SheetTitle,SheetInput)
    this.SheetTitle = SheetInput;
    this.Notes = NotesInput;
    this.Date = new Date(new Date().setDate(new Date().getDate() + 0));
    this.Ongoing = OngoingInput;
    // this.rend.setStyle(Handsonform, 'display', 'none');
    // this.rend.setStyle(HandsonTable, 'display', 'block');

  }
}
