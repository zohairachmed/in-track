import { Component, OnInit } from '@angular/core';
import { editSheetService } from './edit-sheet.service';
import { dataStuct, HandsondataInt } from './edit-sheet';


@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.css']
})
export class EditSheetComponent implements OnInit {
  displayedColumns = ['SheetName', 'Date', 'Notes', 'Ongoing', 'LastupdatedBy', 'createdBy', 'LastUpdateDate', 'Buttons'];
  data: dataStuct[] = [];
  constructor(private _editsheetservice: editSheetService) {

  }

  ngOnInit() {

    this.loadData();
  }

  loadData() {
    this.data = this._editsheetservice.editSheet();
    console.log(this.data)

  }



}
