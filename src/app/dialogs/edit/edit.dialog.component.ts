import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ViewSheetsElement } from '../../components/view-sheets/view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { ViewSheetServices } from '../../components/view-sheets/view-sheets.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewSheetsElement, public viewsheetService: ViewSheetServices) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  // submit() {
  //   // emppty stuff
  // }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  stopEdit(): void {
    this.viewsheetService.updateTodo(this.data).subscribe(datas => {
      
    },
      (err: HttpErrorResponse) => {
        console.log(err + " " + err.message)
      });
    this.dialogRef.close(true);
  }
}
