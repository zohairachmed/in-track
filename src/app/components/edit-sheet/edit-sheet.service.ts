
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
const API_URL = "http://localhost:3000/api/";
// const API_URL = "http://fcltcdh9s72:8049/in-track/v1/sheets/";
// this.httpClient.post(API_URL, todo,{ headers:{'Access-Control-Allow-Origin': '*'} }).subscribe(datas => { 

@Injectable()
export class editSheetService {
  pItems: dataStuct[] = [];  
  

  constructor(private httpClient: HttpClient) { 
    
  }
  
  editSheet():dataStuct[] {
    this.httpClient.get(API_URL + "getsheetInventory").subscribe(datas => {
    console.log(datas["data"][0].data);
      for(var i=0;i<datas["data"].length;i++){
        this.pItems.push(datas["data"][i].data[0]);
        //console.log(this.pItems);
      }
      console.log(this.pItems);
      //this.pItems =  datas["data"][0]; 
      //console.log(this.pItems.data);
       
      
      },
      (err: HttpErrorResponse) => {
    //  this.toastrs.error('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
    
    return (this.pItems); 
   }
  getTodosFromData(): dataStuct[] {
    return this.pItems;
  }
  addTodo(todo: any) {
    console.log(todo);
    this.httpClient.post(API_URL + "addsheetInventory",todo).subscribe(datas => {      
      },
      (err: HttpErrorResponse) => {    
    console.log(err +" " +err.message)
    });
    //this.pItems.push(todo);
  }
  updateTodo(todo: dataStuct) {
    // const index = this.pItems.map(x => x.ID).indexOf(todo.ID);
    // this.pItems[index] = todo;
  }
  deleteTodo(todo: dataStuct) {
    this.pItems.splice(this.pItems.indexOf(todo), 1);
  }
}