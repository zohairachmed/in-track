import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { editSheetService } from '../edit-sheet/edit-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { dataStuct } from '../add-sheet/add-sheet';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager, Toast } from 'ng2-toastr';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-viewonly-sheets',
  templateUrl: './viewonly-sheets.component.html',
  styleUrls: ['./viewonly-sheets.component.css']
})
export class ViewonlySheetsComponent implements OnInit,OnDestroy {
  id: string;
  dataset: any[]=[];
  private alive: boolean = true;

  constructor(private _editsheetservice: editSheetService, private activatedRoute: ActivatedRoute,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {    
    this.id = this.activatedRoute.snapshot.paramMap.get('sheetId');
    this.fetchData();
  }
  ngOnDestroy() {
    this.alive = false;
  }

  fetchData(): void {
      
    this._editsheetservice.editSheetHandsOnTable(this.id).takeWhile(() => this.alive).subscribe(datas => {   
      JSON.stringify(datas);
      
        if(datas["data"].length <1){
         this.dataset.push({"rowId":0});
        }else{
         for (var i = 0; i < datas["data"].length; i++) {
           this.dataset.push(datas["data"][i]);     
         }
       }
       this.toastr.success('Sheet loaded', '', { 
       positionClass: 'toast-bottom-right' , toastLife: 800})
        }, 
       (err: HttpErrorResponse) => {          
       this.toastr.error('Error occurred. Details: ' + err.name + ' ' + err.message,'', { 
        positionClass: 'toast-bottom-right' , toastLife: 800}) 
    })
  

}
}

