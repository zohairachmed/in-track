
import { dataStuct, HandsondataInt } from './add-sheet';
import { dataStucts, Handsondat } from '../../../api/add-sheet-handsontable-data';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef, Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { inject } from '@angular/core/testing';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const API_URL = "http://localhost:3000/api/";
// const API_URL = "http://fcltcdh9s72:8049/in-track/v1/sheets/";
// this.httpClient.post(API_URL, todo,{ headers:{'Access-Control-Allow-Origin': '*'} }).subscribe(datas => { 

@Injectable()
export class AddSheetServices {
  pItems: dataStuct[];

  constructor(private httpClient: HttpClient) {
  }


  getTodosFromData(): dataStuct[] {
    return this.pItems;
  }
  addTodo(todo: any) {
    console.log(todo);
    this.httpClient.post(API_URL + "addsheetInventory", todo).subscribe(datas => {
    },
      (err: HttpErrorResponse) => {
        console.log(err + " " + err.message)
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