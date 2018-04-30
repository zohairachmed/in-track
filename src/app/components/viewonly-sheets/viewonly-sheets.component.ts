import { Component, OnInit } from '@angular/core';
import { editSheetService } from '../edit-sheet/edit-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { dataStuct } from '../add-sheet/add-sheet';

@Component({
  selector: 'app-viewonly-sheets',
  templateUrl: './viewonly-sheets.component.html',
  styleUrls: ['./viewonly-sheets.component.css']
})
export class ViewonlySheetsComponent implements OnInit {
  id: string;
  dataset: dataStuct[];


  constructor(private _editsheetservice: editSheetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('sheetId');
    this.fetchData();


  }
  fetchData(): void {
      
    this.dataset = this._editsheetservice.editSheetHandsOnTable(this.id);     
 
  }
}
