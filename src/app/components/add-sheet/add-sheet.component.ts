import { Component, OnInit, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as Handsontable from 'handsontable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { AddSheetServices } from './add-sheet.service';
import { dataStuct, HandsondataInt } from './add-sheet';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { HotTableModule } from '@handsontable/angular';
import { HotTableRegisterer } from '@handsontable/angular';
import {FormControl, Validators} from '@angular/forms';
import { UUID } from 'angular2-uuid';



@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.css']

})
export class AddSheetComponent implements OnInit {
  @ViewChild('hotTable') hot
  data: dataStuct[];
  rend: Renderer2;
  Date: Date;
  SheetTitle: string;
  Notes: string;
  Ongoing: boolean;
  JsonData: dataStuct[];


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

  constructor(private _AddSheetServices: AddSheetServices, public renderer: Renderer2,
    private refs: ChangeDetectorRef) {
    this.data = _AddSheetServices.getTodosFromData();
    this.rend = renderer;
    this.Date = new Date(new Date().setDate(new Date().getDate() + 0));

  }

  ngOnInit() {
    //console.log (this.data);

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
      td.style.backgroundColor = "red"
    }

    // console.log(value);

    // this.RowCount = value;
    // console.log("final="+ this.RowCount);

    // console.log(instance.countEmptyRows());
    // console.log(instance.getInstance());
    // console.log(instance.getSourceData());
    // console.log(row);
    // console.log(col);
    // console.log(instance.isEmptyRow());


  }



  PostHandsondata() {
    // console.log(this.hot.getInstance());
    //   console.log(this.hot.data.isNull);
    //  console.log(this.hot);

    // var data = hot_instance.getData();
    //console.log(data); 


    //console.log(this.hot.hotInstance.getDataAtRow("2"));
    // console.log(this.hot.hotInstance.getDataAtRow("3"));
    //console.log(aa.handsontable.rowHeaders.value)
    var array: any[] = [];
    for (let index = 0; index < this.data.length; index++) {
      if (this.hot.hotInstance.getDataAtRow(index)[1]) {
        array.push(this.data[index].Handsondata);
      }
    };
    console.log(array);
    if(array.length < 1){
      alert("fill")
    }else{
      let uuid = UUID.UUID();
    this.JsonData = [{
      
      Id:uuid,
      SheetName: this.SheetTitle,
      Date: this.Date,
      Handsondata: array,
      Notes: this.Notes,
      Ongoing: this.Ongoing
    }];
    console.log(this.JsonData);
  }
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
    this.rend.setStyle(Handsonform, 'display', 'none');
    this.rend.setStyle(HandsonTable, 'display', 'block');

  }
}
