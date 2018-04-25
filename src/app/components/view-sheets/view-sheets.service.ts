import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef, Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { inject } from '@angular/core/testing';
import { ViewSheetsElement } from './view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//const API_URL = "http://localhost:3000/api/";
const API_URL = "http://localhost:8049/in-track/v1/sheets/";
// this.httpClient.get(API_URL + "list",{ headers:{'Access-Control-Allow-Origin': '*'} }).subscribe(datas => {

@Injectable()
export class ViewSheetServices {
  pItems: ViewSheetsElement[]= []; //= ELEMENT_DATA;
  dataLength:any;
  dataChange: BehaviorSubject<ViewSheetsElement[]> = new BehaviorSubject<ViewSheetsElement[]>([]);
  get data(): ViewSheetsElement[] { return this.dataChange.value; }
  viewRef: ViewContainerRef;
  toastrs: ToastsManager;
  constructor(private httpClient: HttpClient) {
    //this.http  = httpClient; 
    this.getAllItems()

  }

  getAllItems() {
    this.httpClient.get(API_URL + "list", { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true }).subscribe(result => {
 
      //this.httpClient.get(API_URL + "getsheetInventory").subscribe(datas => {
      this.dataLength = result;
      for (var i = 0; i < this.dataLength.length ; i++) {
        this.pItems.push(result[i]);
        //console.log(this.pItems);
      }
      //this.pItems =  datas["data"][0]; 
      //console.log(this.pItems.data);
      this.dataChange.next(this.pItems);

    },
      (err: HttpErrorResponse) => {
        //  this.toastrs.error('Error occurred. Details: ' + err.name + ' ' + err.message);
      });

  }

  // GetDataforFilterandPagination(){    
  // console.log(this.pItems);
  //   this.dataChange.next(this.pItems);

  // }

  getTodosFromData(): ViewSheetsElement[] {
    return this.pItems;
  }

  // addTodo(todo: ViewSheetsElement) {
  //   this.httpClient.get(API_URL + "addsheetInventory").subscribe(datas => {      
  //     console.log(datas);
  //     this.pItems =  datas;
  //     this.dataChange.next(this.pItems.data);  
  //     },
  //     (err: HttpErrorResponse) => {
  //   //  this.toastrs.error('Error occurred. Details: ' + err.name + ' ' + err.message);
  //   });
  //   this.pItems.push(todo);
  // }


  updateTodo(todo: ViewSheetsElement) {
    console.log(todo);

    // const index = this.pItems.map(x => x.Id).indexOf(todo.Id);
    // console.log(index);
    // this.pItems[index] = todo;
  }
  deleteTodo(todo: ViewSheetsElement) {
    // const index = this.pItems.findIndex(Items => Items.Id === todo.Id);
    // this.pItems.splice(index, 1);
  }
}