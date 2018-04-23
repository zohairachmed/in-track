import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ViewSheetsElement } from '../../components/view-sheets/view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { ViewSheetServices } from '../../components/view-sheets/view-sheets.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {
  DataClass: ViewSheetsElement;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewSheetsElement, public viewsheetService: ViewSheetServices) {


  }

  onNoClick(): void {
    this.dialogRef.close(false);
    // console.log(this.dataService);
    // this.pItems = this.dataService.pItems;
  }

  confirmDelete(): void {
    // console.log(this.data);
    //this.DataClass = this.data;
    this.viewsheetService.deleteTodo(this.data);
    // console.log(this.DataClass)
    // this.dataService.deleteIssue(this.data.Id);
    this.dialogRef.close(true);

  }
}
