import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef, Injectable, Injector, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { inject } from '@angular/core/testing';
import { ViewSheetsElement } from './view-sheets';
import { ELEMENT_DATA } from '../../../api/view-sheet-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
// 
import { environment } from '../../../environments/environment';
//const API_URL = "http://localhost:8049/in-track/v1/sheets/";

const API_URL = environment.api_url;

@Injectable()
export class ViewSheetServices {
  pItems: ViewSheetsElement[] = []; //= ELEMENT_DATA;
  dataLength: any;
  constructor(private httpClient: HttpClient) {
  }


  getAllItems(): Observable<any> {
    return this.httpClient.get(API_URL + "list", { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true });
  }


  updateTodo(todo: any): Observable<any> {
    //console.log(todo);
    return this.httpClient.put(API_URL + todo.sheetId, JSON.stringify(todo), {
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      , withCredentials: true
    });
  }


  deleteTodo(todo: ViewSheetsElement): Observable<any> {
    const index = this.pItems.findIndex(Items => Items.sheetId === todo.sheetId);
    this.pItems.splice(index, 1);
    return this.httpClient.delete(API_URL + todo.sheetId, { headers: { 'Access-Control-Allow-Origin': '*' }, withCredentials: true })
  }



}
