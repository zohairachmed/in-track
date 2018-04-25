
import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {editSheetService} from './edit-sheet.service';
import { dataStuct, HandsondataInt } from './edit-sheet';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import * as Handsontable from 'handsontable';
import { dataStucts } from '../../../api/add-sheet-handsontable-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.css']
})
export class EditSheetComponent implements OnInit {
  @ViewChild('hotTable') hot
  messages:string[] = [];
  dataset: HandsondataInt[] = [];
  fetched = false;
  error = false;
  sub: any;
  id: string;
  saveMessages: string[] = [];

  constructor(private _editsheetservice: editSheetService, private activatedRoute: ActivatedRoute) {
   this.id =  this.activatedRoute.snapshot.paramMap.get('sheetId');
     

   }
  
  ngOnInit() {
    this.fetchData();
   
  }
  render(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);

    if (value < 8 && value !== null) {
      td.style.backgroundColor = "red";

    }
  }
  fetchData(): void {
    this.dataset = [];
     this.dataset = this._editsheetservice.editSheet(this.id);    
     
     
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

  async onAfterChange($event) {
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
     
      if(prop === 'rowId'){
        return;
      }
      console.log(row);
      const uid = hotInstance.getDataAtCell(row, 'rowId');
      if(uid == null || uid == undefined || uid == '')
      {
        var number = hotInstance.getDataAtProp('rowId');
        for(var j=0;j<number.length;++j){
            if(number[j] == null)
            {
             hotInstance.setDataAtCell(j, 0, j);
            }
        }      
        alert(newVal + prop + row); 
      }      
      else{
        alert(newVal + prop + uid); 
      }  
     
         
     
         
      
             
        
      
    
      
      
      // if(uid !== null && uid !== undefined && uid !==''){
      //   alert(newVal + prop + uid);
      //   //this.saveData({uid: uid, prop: prop, value: newVal});
      // }else{
      //  var number = hotInstance.getDataAtProp('rowId');
      //   console.log(number);
      //   for(var j=0;j<number.length;++j){
      //       if(number[j] == null || number[j] == undefined || number[j] == '')
      //       {
      //         this.hot.hotInstance.setDataAtCell(j, 0, j)
              
      //       }
      //   } 
      //   alert(newVal + prop + uid);
        
      // }

    })
   }

  

}
