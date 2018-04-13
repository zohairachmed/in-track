import { Component, OnInit,  Renderer2 } from '@angular/core';
import * as Handsontable from 'handsontable';
import {AddSheetServices} from './add-sheet.service';
import { dataStuct } from './add-sheet';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.css'] 
  
})
export class AddSheetComponent implements OnInit {
  data: dataStuct[];
  showHide: boolean;
  rend:Renderer2;  
  Date:  Date;
  SheetTitle:string;
  Notes:string;
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

  constructor(private _AddSheetServices:AddSheetServices, public renderer: Renderer2) { 
    this.data = _AddSheetServices.getTodosFromData();
    this.rend = renderer;
    this.Date =  new Date(new Date().setDate(new Date().getDate() + 0));

   
  }

  ngOnInit() {
     console.log (this.data);
     
  }
  ShowHandsontable(SheetInput,DateInput,NotesInput,OngoingInput, HandsonTable, Handsonform){
    // this.rend.setValue(SheetTitle,SheetInput)
    this.SheetTitle = SheetInput;
    this.Notes = NotesInput;
    this.rend.setStyle(Handsonform,'display','none');
    this.rend.setStyle(HandsonTable, 'display', 'block');
    console.log(SheetInput,DateInput,NotesInput,OngoingInput, HandsonTable)
  }
}
