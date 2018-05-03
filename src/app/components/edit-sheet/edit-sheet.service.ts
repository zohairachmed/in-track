import { dataStuct, HandsondataInt } from './edit-sheet';
import { dataStucts,Handsondat } from '../../../api/add-sheet-handsontable-data';
import { UUID } from 'angular2-uuid';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef, Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { inject } from '@angular/core/testing';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

// const API_URL = "http://localhost:3000/api/";
const API_URL = "http://localhost:8049/in-track/v1/sheets/";
// const API_URL = "http://fcltcdh9s72:8049/in-track/v1/sheets/";
// this.httpClient.post(API_URL, todo,{ headers:{'Access-Control-Allow-Origin': '*'} }).subscribe(datas => { 

@Injectable()
export class editSheetService {
  ItemsRaw: any;
  ItemsHandson: any;

  saveMessages: string[] = [];

  constructor(private httpClient: HttpClient) { 
    
  }
  
  editSheetRaw(id:string):Observable<any> {
   // this.ItemsRaw = [];   
   return this.httpClient.get<any>(API_URL + id, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true });
   
  //  .subscribe(datas => {   
  //    JSON.stringify(datas);
  //     // for (var i = 0; i < datas["data"].length; i++) {
  //       this.ItemsRaw.push(datas);     
  //     // }
      
  //     },
  //     (err: HttpErrorResponse) => {
  //   //  this.toastrs.error('Error occurred. Details: ' + err.name + ' ' + err.message);
  //   });
  //   //console.log(this.pItems);
  //   return (this.ItemsRaw); 
  
   }
 
   editSheetHandsOnTable(id:string):Observable<any> {
    //this.ItemsHandson = [];   
   return this.httpClient.get<any>(API_URL + id, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true })
   
  //  .subscribe(datas => {   
  //    JSON.stringify(datas);
  //    if(datas["data"].length <1){
  //     this.ItemsHandson.push({"rowId":0});
  //    }else{
  //     for (var i = 0; i < datas["data"].length; i++) {
  //       this.ItemsHandson.push(datas["data"][i]);     
  //     }
  //   }
  //     },
  //     (err: HttpErrorResponse) => {
  //   //  this.toastrs.error('Error occurred. Details: ' + err.name + ' ' + err.message);
  //   });
  //   //console.log(this.pItems);
  //   return (this.ItemsHandson); 
  
   }
  getTodosFromData(): dataStuct[] {
    return this.ItemsRaw;
  }
  addTodo(todo: any) {
    
    
  }
  updateSheet(todo: any):Observable<any> {
    //console.log(todo);    
    return this.httpClient.put(API_URL + todo.sheetId,todo, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true })
  //this.pItems.push(todo);
    // const index = this.pItems.map(x => x.ID).indexOf(todo.ID);
    // this.pItems[index] = todo;
  }
  deleteTodo(todo: dataStuct) {
    this.ItemsRaw.splice(this.ItemsRaw.indexOf(todo), 1);
  }
  // saveSheet(data:any) {
  //   // Here you can use this.httpClient.post(this.url, body)
  //   // Below is only an example
  //   var id = data.sheetId;
  //   console.log(id);
  //   this.httpClient.post(API_URL+id, JSON.stringify(data), { 
  //     headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':  'application/json' }
  //     , withCredentials: true
  //     }).subscribe(datas => {

        
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log(err + " " + err.message)
  //     });
  //   //this.pItems.push(todo);
  
  //   return Observable.of(`UPDATE users SET ${data.prop}='${data.value}' WHERE uid=${data.rowId}`);
  // }

}
