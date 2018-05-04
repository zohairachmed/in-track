
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
import { Observable } from 'rxjs/Observable';
// const API_URL = "http://localhost:3000/api/";
import { environment } from '../../../environments/environment';
//const API_URL = "http://localhost:8049/in-track/v1/sheets/";

const API_URL = environment.api_url;

@Injectable()
export class AddSheetServices {
  pItems: any;

  constructor(private httpClient: HttpClient) {
  }


  getTodosFromData(): Observable<any> {
    return this.pItems;
  }
  addTodo(todo: any): Observable<any> {
    
   var id = todo.sheetId;   
   return this.httpClient.post(API_URL+id, JSON.stringify(todo), { 
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':  'application/json' }
      , withCredentials: true
      })  
  }  
 
}